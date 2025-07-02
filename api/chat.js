export default async function handler(req, res) {
  console.log('Request method:', req.method);
  console.log('Request body:', req.body); // <--- Add this line

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Missing message in request body' });
    }

    return res.status(200).json({ reply: `Odin hears: ${message}` });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server Error' });
  }
}
