import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 8080;
const apiKey = process.env.GOOGLE_API_KEY || process.env.VITE_GOOGLE_API_KEY;

if (!apiKey) {
  console.error('Error: GOOGLE_API_KEY o VITE_GOOGLE_API_KEY no está configurado.');
}

app.use(express.json());

app.post('/api/google/*', async (req, res) => {
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  const targetPath = req.params[0];
  const url = `https://generativelanguage.googleapis.com/${targetPath}?key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const responseBody = await response.text();
    res.status(response.status);
    response.headers.forEach((value, name) => {
      if (name.toLowerCase() === 'transfer-encoding') return;
      res.setHeader(name, value);
    });
    res.send(responseBody);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Error en el proxy de la API' });
  }
});

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Servidor proxy iniciado en http://localhost:${port}`);
});
