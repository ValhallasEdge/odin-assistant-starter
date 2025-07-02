export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Missing message in request body' });
    }

    // TEMP: Echo back the message to test basic functionality
    return res.status(200).json({ reply: `Odin hears: ${message}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server Error' });
  }
}
