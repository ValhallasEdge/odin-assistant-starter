export default async function handler(req, res) {
  const { message } = req.body;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const ASSISTANT_ID = process.env.ASSISTANT_ID;

  const response = await fetch("https://api.openai.com/v1/assistants/" + ASSISTANT_ID + "/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input: message })
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices?.[0]?.message?.content || "Odin is silent." });
}
