export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const data = JSON.parse(Buffer.concat(buffers).toString());
    const { message } = data;

    if (!message) {
      return res.status(400).json({ error: 'Missing message in request body' });
    }

    return res.status(200).json({ reply: `Odin hears: ${message}` });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server Error' });
  }
}
