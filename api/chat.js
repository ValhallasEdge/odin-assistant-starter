module.exports = async function (req, res) {
  // --- CORS HEADERS (MUST BE FIRST) ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    // Respond OK to preflight, no body needed
    return res.status(200).end();
  }

  // ---- Only allow POST ----
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ---- API Key & Assistant ID ----
  const apiKey = process.env.OPENAI_API_KEY;
  const assistantId = req.body.assistantId;

  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not set in environment' });
  }
  if (!assistantId) {
    return res.status(400).json({ error: 'Missing assistantId in request body' });
  }

  // ---- Headers for OpenAI ----
  const openaiHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'OpenAI-Beta': 'assistants=v2'
  };

  try {
    const { message, threadId } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Missing message in request body' });
    }

    let currentThreadId = threadId;
    // ---- Create new thread if none passed ----
    if (!currentThreadId) {
      const threadResp = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: openaiHeaders,
        body: JSON.stringify({}),
      });
      const threadData = await threadResp.json();
      currentThreadId = threadData.id;
    }

    // ---- Add user message to thread ----
    const userMsgResp = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      method: 'POST',
      headers: openaiHeaders,
      body: JSON.stringify({
        role: "user",
        content: message,
      }),
    });
    const userMsgData = await userMsgResp.json();
    if (!userMsgData || userMsgData.error) {
      return res.status(500).json({ error: "Failed to post user message: " + (userMsgData?.error?.message || "Unknown error") });
    }

    // ---- Start the run ----
    const runResp = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs`, {
      method: 'POST',
      headers: openaiHeaders,
      body: JSON.stringify({
        assistant_id: assistantId,
      }),
    });
    const runData = await runResp.json();

    let status = runData.status;
    let finalRunData = runData;
    // ---- Poll until completed or timeout ----
    for (let i = 0; i < 20 && status !== 'completed'; i++) {
      await new Promise(res => setTimeout(res, 1000));
      const pollResp = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs/${runData.id}`, {
        headers: openaiHeaders,
      });
      finalRunData = await pollResp.json();
      status = finalRunData.status;
      if (status === 'completed') break;
    }

    if (status !== 'completed') {
      return res.status(500).json({
        error: `Run status: ${status} - ${finalRunData?.last_error?.message || JSON.stringify(finalRunData)}`
      });
    }

    // ---- Retrieve the latest assistant message ----
    const msgResp = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      headers: openaiHeaders,
    });
    const msgs = await msgResp.json();
    const assistantMsg = msgs.data.reverse().find(m => m.role === 'assistant');
    const reply = assistantMsg?.content?.[0]?.text?.value || "This god is silent.";

    return res.status(200).json({ reply, threadId: currentThreadId });

  } catch (err) {
    const errorMessage = typeof err === 'object' && err !== null
      ? (err.message || JSON.stringify(err))
      : String(err);
    console.error("BACKEND ERROR:", errorMessage, err);
    return res.status(500).json({ error: errorMessage });
  }
}

