import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend running successfully' });
});

// Generate questions endpoint
app.post('/api/generate-questions', async (req, res) => {
  try {
    const { topic, numQuestions, difficulty } = req.body;

    if (!topic || !numQuestions || !difficulty) {
      return res.status(400).json({ error: 'Missing required parameters: topic, numQuestions, difficulty' });
    }

    const apiKey = process.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('API Key not configured');
      return res.status(500).json({ error: 'API Key not configured in server environment' });
    }

    const prompt = `Genera exactamente ${numQuestions} preguntas de opción múltiple sobre el tema "${topic}" con un nivel de dificultad "${difficulty}". Responde ÚNICAMENTE con un objeto JSON válido. Estructura obligatoria:\n{\n  "questions": [\n    {\n      "prompt": "texto de la pregunta",\n      "options": ["Opción A", "Opción B", "Opción C", "Opción D"],\n      "answer": "A" o "B" o "C" o "D" SOLAMENTE,\n      "hint": "pista breve"\n    }\n  ]\n}\n\nIMPORTANTE:\n- answer DEBE ser SOLO la letra: "A", "B", "C" o "D"\n- options SIEMPRE tiene exactamente 4 elementos\n- NO incluyas explicaciones ni comentarios\n- Devuelve ÚNICAMENTE el JSON, nada más\n\nEjemplo:\n{\n  "questions": [\n    {\n      "prompt": "¿Cuál es la capital de Francia?",\n      "options": ["Madrid", "París", "Berlín", "Roma"],\n      "answer": "B",\n      "hint": "Una ciudad muy romántica"\n    }\n  ]\n}`;

    console.log(`Generating questions for topic: ${topic}, difficulty: ${difficulty}, count: ${numQuestions}`);

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `Gemini API error: ${response.status}`,
        details: errorText 
      });
    }

    const data = await response.json();
    console.log('Gemini response:', JSON.stringify(data, null, 2));

    // Extract text from Gemini response
    const extractText = (value) => {
      if (typeof value === 'string') return value;
      if (Array.isArray(value)) {
        return value.map((item) => extractText(item)).join('');
      }
      if (value && typeof value === 'object') {
        if (value.parts && Array.isArray(value.parts)) {
          return extractText(value.parts[0]?.text ?? '');
        }
        return extractText(value.text ?? value.content ?? '');
      }
      return '';
    };

    const generatedText = extractText(data.candidates?.[0]?.content ?? data.generatedText ?? '').trim();
    console.log('Extracted text:', generatedText);

    // Parse JSON from response
    const parseQuiz = (raw) => {
      try {
        const parsed = JSON.parse(raw);
        return parsed.questions ?? parsed;
      } catch {
        const match = raw.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        if (match) return parseQuiz(match[0]);
        return null;
      }
    };

    const questionsArray = parseQuiz(generatedText);
    if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
      throw new Error(`Could not parse JSON from AI response. Raw: ${generatedText}`);
    }

    // Format questions
    const formattedQuestions = questionsArray.slice(0, numQuestions).map((q, i) => ({
      id: `${topic}-${i}`,
      prompt: q.prompt?.toString() || `Question ${i + 1} about ${topic}`,
      options: Array.isArray(q.options) ? q.options.map((option) => option.toString()) : ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: (q.answer?.toString() || 'A').toUpperCase(),
      difficulty,
      hint: q.hint?.toString() || 'Think about the topic and choose the best option.',
    }));

    res.json({
      success: true,
      questions: formattedQuestions,
      rawResponse: generatedText,
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Server error generating questions',
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('Environment: ', process.env.NODE_ENV || 'development');
  if (!process.env.VITE_GOOGLE_API_KEY) {
    console.warn('WARNING: VITE_GOOGLE_API_KEY not configured in environment');
  }
});
