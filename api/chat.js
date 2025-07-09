// api/chat.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { assistantId, message, threadId } = req.body;

  try {
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    let completed = false;
    let replyText = "";

    while (!completed) {
      const status = await openai.beta.threads.runs.retrieve(threadId, run.id);
      if (status.status === "completed") {
        const messages = await openai.beta.threads.messages.list(threadId);
        const assistantMessages = messages.data.filter(msg => msg.role === "assistant");
        replyText = assistantMessages[0]?.content[0]?.text?.value || "No response";
        completed = true;
      } else if (status.status === "failed") {
        throw new Error("Assistant run failed.");
      }
      await new Promise(r => setTimeout(r, 1000));
    }

    res.status(200).json({ reply: replyText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error processing request" });
  }
}
