module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY; // Put this in your Vercel Project settings
  const assistantId = process.env.ODIN_ASSISTANT_ID; // Ditto: your custom Assistant's ID

  try {
    const { message, threadId } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Missing message in request body' });
    }

    // 1. If there's no thread, create one (for conversational memory)
    let currentThreadId = threadId;
    if (!currentThreadId) {
      // Create a new thread
      const threadResp = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({}),
      });
      const threadData = await threadResp.json();
      currentThreadId = threadData.id;
    }

    // 2. Post user message to the thread
    await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        role: "user",
        content: message,
      }),
    });

    // 3. Run the assistant on the thread
    const runResp = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        assistant_id: assistantId,
      }),
    });
    const runData = await runResp.json();

    // 4. Poll for run completion (simplified: waits until status is 'completed')
    let status = runData.status;
    let finalRunData = runData;
    for (let i = 0; i < 20 && status !== 'completed'; i++) {
  await new Promise(res => setTimeout(res, 1000));
  const pollResp = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs/${runData.id}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });
  finalRunData = await pollResp.json();
  status = finalRunData.status;
  console.log(`[ODIN POLL] Status: ${status} | Details: ${JSON.stringify(finalRunData)}`);
  if (status === 'completed') break;
}
    if (status !== 'completed') {
  return res.status(500).json({ 
    error: `Odin run status: ${status} - ${finalRunData?.last_error?.message || JSON.stringify(finalRunData)}` 
  });
}


    // 5. Retrieve the latest assistant message
    const msgResp = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    const msgs = await msgResp.json();
    // Get the last message from 'assistant'
    const assistantMsg = msgs.data.reverse().find(m => m.role === 'assistant');
    const reply = assistantMsg?.content?.[0]?.text?.value || "Odin is silent.";

    return res.status(200).json({ reply, threadId: currentThreadId });

  } catch (err) {
  // Send the actual error message to the frontend for debugging!
  const errorMessage = typeof err === 'object' && err !== null
    ? (err.message || JSON.stringify(err))
    : String(err);
  console.error("ODIN BACKEND ERROR:", errorMessage, err);
  return res.status(500).json({ error: errorMessage });
}
}
