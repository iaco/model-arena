import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { compareProviders } from './router.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.post('/compare', async (req, res) => {
  try {
    const { prompt, providers, options } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!providers || !providers.length) {
      return res.status(400).json({ error: 'At least one provider is required' });
    }

    const results = await compareProviders(prompt, providers, options ?? {});
    res.json({ prompt, results });

  } catch (error) {
    console.error('Error in /compare endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});