// api/start-thread.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  try {
    const thread = await openai.beta.threads.create();
    res.status(200).json({ threadId: thread.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create thread." });
  }
}
