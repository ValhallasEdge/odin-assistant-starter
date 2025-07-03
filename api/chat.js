module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const assistantId = process.env.ODIN_ASSISTANT_ID;

  const openaiHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'OpenAI-Beta': 'assistants=v2'
  };

  try {
    // Debug log incoming body
    console.log("ODIN API DEBUG: Incoming body:", req.body);

    const { message, threadId } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Missing message in request body' });
    }

    // Log received message and threadId
    console.log("ODIN API DEBUG: Message received:", message);
    console.log("ODIN API DEBUG: ThreadId received:", threadId);

    let currentThreadId = threadId;
    if (!currentThreadId) {
      const threadResp = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: openaiHeaders,
        body: JSON.stringify({}),
      });
      const threadData = await threadResp.json();
      currentThreadId = threadData.id;

      // Debug: new thread created
      console.log("ODIN API DEBUG: New thread created:", currentThreadId);
    }

    // Post user message to the thread
    const userMsgResp = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      method: 'POST',
      headers: openaiHeaders,
      body: JSON.stringify({
        role: "user",
        content: message,
      }),
    });
    const userMsgResult = await userMsgResp.json();
    console.log("ODIN API DEBUG: Message posted to thread:", currentThreadId, "Result:", userMsgResult);

    // Run the assistant on the thread
    const runResp = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs`, {
      method: 'POST',
      headers: openaiHeaders,
      body: JSON.stringify({
        assistant_id: assistantId,
      }),
    });
    const runData = await runResp.json();
    console.log("ODIN API DEBUG: Assistant run started. RunData:", runData);

    // Poll for run completion
    let status = runData.status;
    let finalRunData = runData;
    for (let i = 0; i < 20 && status !== 'completed'; i++) {
      await new Promise(res => setTimeout(res, 1000));
      const pollResp = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs/${runData.id}`, {
        headers: openaiHeaders,
      });
      finalRunData = await pollResp.json();
      status = finalRunData.status;
      console.log(`ODIN API DEBUG: Poll #${i + 1}, status: ${status}`);
      if (status === 'completed') break;
    }

    if (status !== 'completed') {
      console.error("ODIN API DEBUG: Run did not complete.", finalRunData);
      return res.status(500).json({ 
        error: `Odin run status: ${status} - ${finalRunData?.last_error?.message || JSON.stringify(finalRunData)}` 
      });
    }

    // Retrieve the latest assistant message
    const msgResp = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      headers: openaiHeaders,
    });
    const msgs = await msgResp.json();
    // Debug: show all assistant messages
    console.log("ODIN API DEBUG: Assistant messages received:", msgs);

    const assistantMsg = msgs.data.reverse().find(m => m.role === 'assistant');
    const reply = assistantMsg?.content?.[0]?.text?.value || "Odin is silent.";

    // Final debug
    console.log("ODIN API DEBUG: Final reply to user:", reply);

    return res.status(200).json({ reply, threadId: currentThreadId });

  } catch (err) {
    const errorMessage = typeof err === 'object' && err !== null
      ? (err.message || JSON.stringify(err))
      : String(err);
    console.error("ODIN BACKEND ERROR:", errorMessage, err);
    return res.status(500).json({ error: errorMessage });
  }
}
