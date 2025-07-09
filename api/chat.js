export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { OpenAI } = await import("openai");

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { assistantId, message, threadId } = req.body;

  try {
    // Create user message
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    // Create a run for that assistant
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    // Wait until run is complete
    let completed = false;
    let replyText = "";
    while (!completed) {
      const status = await openai.beta.threads.runs.retrieve(threadId, run.id);
      if (status.status === "completed") {
        const messages = await openai.beta.threads.messages.list(threadId);
        const assistantMessages = messages.data.filter(
          (msg) => msg.role === "assistant"
        );

        // Try to find a usable reply
        const latest = assistantMessages[0];
        if (latest && latest.content?.[0]?.text?.value) {
          replyText = latest.content[0].text.value;
        } else {
          replyText = "⚠️ No usable content in assistant reply.";
        }

        completed = true;
      } else if (status.status === "failed") {
        throw new Error("Run failed.");
      }

      await new Promise((r) => setTimeout(r, 1000));
    }

    res.status(200).json({ reply: replyText });
  } catch (err) {
    console.error("Chat handler error:", err);
    res.status(500).json({ error: "Server error processing chat." });
  }
}
