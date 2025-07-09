export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { assistantId, message, threadId } = req.body;

  try {
    const { OpenAI } = await import('openai');

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create message
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    // Poll until run completes
    let completed = false;
    let replyText = "";
    while (!completed) {
      const status = await openai.beta.threads.runs.retrieve(threadId, run.id);

      if (status.status === "completed") {
        const messages = await openai.beta.threads.messages.list(threadId);
        const assistantMessages = messages.data.filter(
          (msg) => msg.role === "assistant"
        );
        replyText =
  assistantMessages?.[0]?.content?.[0]?.text?.value ??
  JSON.stringify(messages.data[messages.data.length - 1] || { message: "No reply." });
        completed = true;
      } else if (status.status === "failed") {
        throw new Error("Run failed");
      }

      await new Promise((r) => setTimeout(r, 1000));
    }

    res.status(200).json({ reply: replyText });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Error processing chat" });
  }
}
