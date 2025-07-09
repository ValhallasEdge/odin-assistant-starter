// api/start-thread.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const openai = new (await import('openai')).default({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const thread = await openai.beta.threads.create();
    res.status(200).json({ threadId: thread.id });
  } catch (error) {
    console.error('Start-thread error:', error);
    res.status(500).json({ error: 'Failed to start thread' });
  }
}
