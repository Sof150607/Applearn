import { useMemo, useState } from 'react';
import { difficultyOptions, timeOptions } from '../data/questions';
import { useUser } from '../context/UserContext';
import type { Difficulty, Question, TimeOption } from '../types';

type GeneratedQuestionSet = {
  questions: Question[];
  rawResponse: string;
};

const getAdjustedDifficulty = (correct: boolean, current: Difficulty): Difficulty => {
  const order: Difficulty[] = ['fácil', 'medio', 'difícil'];
  const index = order.indexOf(current);
  if (correct && index < order.length - 1) return order[index + 1];
  if (!correct && index > 0) return order[index - 1];
  return current;
};

const generateQuestions = async (topic: string, numQuestions: number, difficulty: Difficulty): Promise<GeneratedQuestionSet> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

  try {
    console.log('Generando preguntas para:', topic, numQuestions, difficulty);
    console.log('Usando backend en:', backendUrl);
    
    const response = await fetch(`${backendUrl}/api/generate-questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        numQuestions,
        difficulty,
      }),
    });

    console.log('Respuesta HTTP:', response.status, response.statusText);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.questions)) {
      throw new Error(data.error || 'Invalid response from backend');
    }

    return {
      questions: data.questions,
      rawResponse: data.rawResponse,
    };

  } catch (error) {
    console.error('Error generating questions:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`No se pudieron generar preguntas: ${errorMessage}. Asegúrate de que el servidor backend está corriendo en ${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}`);
  }
};

const StudyPage = () => {
  const { addSession } = useUser();
  const [topic, setTopic] = useState('');
  const [timeBudget, setTimeBudget] = useState<TimeOption>('medio');
  const [difficulty, setDifficulty] = useState<Difficulty>('medio');
  const [questionCount, setQuestionCount] = useState(10);
  const [questionSequence, setQuestionSequence] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | ''>('');
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'correct' | 'incorrect'; message: string; hint?: string }>({ status: 'idle', message: '' });
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [apiError, setApiError] = useState('');
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = questionSequence[currentIndex];
  const timeLabel = useMemo(() => timeOptions.find((option) => option.value === timeBudget)?.label ?? 'Medio tiempo', [timeBudget]);
  const isLastQuestion = questionSequence.length > 0 && currentIndex + 1 === questionCount;

  const startSession = async () => {
    if (!topic.trim()) {
      alert('Por favor ingresa un tema de estudio.');
      return;
    }

    const count = timeOptions.find((option) => option.value === timeBudget)?.questions ?? 10;
    setQuestionCount(count);
    setSessionCompleted(false);
    setIsLoading(true);
    setStartTime(Date.now());

    try {
      const generatedResult = await generateQuestions(topic, count, difficulty);
      setQuestionSequence(generatedResult.questions);
      setCurrentIndex(0);
      setSelectedOption('');
      setFeedback({ status: 'idle', message: '' });
      setCorrectCount(0);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Error al generar preguntas:', message);
      setApiError(message);
      alert(`Error al generar preguntas: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;
    if (!selectedOption) {
      alert('Selecciona una opción antes de enviar.');
      return;
    }

    const isCorrect = selectedOption === currentQuestion.answer;

    setFeedback({
      status: isCorrect ? 'correct' : 'incorrect',
      message: isCorrect ? '¡Correcto! Continúa con confianza.' : 'No fue la mejor respuesta.',
      hint: isCorrect ? currentQuestion.hint : `Pista: ${currentQuestion.hint}`,
    });

    if (isCorrect) setCorrectCount((value) => value + 1);
  };

  const goNextQuestion = () => {
    if (!currentQuestion) return;

    if (currentIndex + 1 >= questionCount) {
      const endTime = Date.now();
      const totalTime = startTime ? (endTime - startTime) / 1000 : 0;
      const averageTimePerQuestion = totalTime / questionCount;
      const accuracy = questionCount > 0 ? (correctCount / questionCount) * 100 : 0;

      addSession({
        topic,
        timeOption: timeBudget,
        difficulty,
        questionsCount: questionCount,
        correctAnswers: correctCount,
        accuracy,
        averageTimePerQuestion,
      });

      setQuestionSequence([]);
      setCurrentIndex(0);
      setSelectedOption('');
      setFeedback({ status: 'idle', message: '' });
      setCorrectCount(0);
      setStartTime(null);
      setSessionCompleted(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedOption('');
    setFeedback({ status: 'idle', message: '' });
  };

  const sessionFinished = sessionCompleted;

  return (
    <section className="card study-card">
      <div className="section-row">
        <div>
          <p className="section-label">Sesión adaptativa</p>
          <h2>Comienza un recorrido con feedback en tiempo real.</h2>
          <p className="copy">Escoge cuánto tiempo tienes y qué dificultad prefieres antes de iniciar la sesión.</p>
        </div>
      </div>

      {sessionCompleted && (
        <div className="summary-card-large">
          <p className="section-label">¡Sesión guardada!</p>
          <h3>Tu sesión de estudio se registró correctamente.</h3>
          <p className="copy">Ahora puedes revisar tu progreso en la pestaña Progreso o iniciar una nueva sesión.</p>
        </div>
      )}

      {!questionSequence.length ? (
        <div className="form-grid">
          <div className="field-group">
            <label htmlFor="topic">Tema de estudio</label>
            <input
              id="topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="input-field"
              type="text"
              placeholder="Ej: Diseño de UX, Matemáticas, etc."
            />
          </div>

          <div className="option-block">
            <strong>Duración disponible</strong>
            {timeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={timeBudget === option.value ? 'option-button active' : 'option-button'}
                onClick={() => setTimeBudget(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="option-block">
            <strong>Dificultad inicial</strong>
            {difficultyOptions.map((level) => (
              <button
                key={level}
                type="button"
                className={difficulty === level ? 'option-button active' : 'option-button'}
                onClick={() => setDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="summary-card">
            <p>La sesión tendrá <strong>{timeOptions.find((option) => option.value === timeBudget)?.questions}</strong> preguntas y empezará en dificultad <strong>{difficulty}</strong>.</p>
          </div>

          {apiError && (
            <div className="feedback-panel incorrect">
              <strong>Error de API</strong>
              <p>{apiError}</p>
            </div>
          )}

          <button type="button" className="primary-button" onClick={startSession} disabled={isLoading}>{isLoading ? 'Generando...' : 'Iniciar sesión'}</button>
        </div>
      ) : (
        <>
          <div className="session-header">
            <div>
              <p className="section-label">Pregunta {currentIndex + 1} de {questionCount}</p>
              <h2>{currentQuestion?.prompt}</h2>
            </div>
            <div className="metric-chip">Tiempo: {timeLabel}</div>
          </div>

          <div className="answer-card">
            <p className="answer-label">Selecciona la opción correcta entre A, B, C o D</p>
            <div className="quick-actions">
              {currentQuestion?.options.map((option, index) => {
                const letter = String.fromCharCode(65 + index) as 'A' | 'B' | 'C' | 'D';
                return (
                  <button
                    key={option}
                    type="button"
                    className={selectedOption === letter ? 'chip active' : 'chip'}
                    onClick={() => setSelectedOption(letter)}
                  >
                    {letter}. {option}
                  </button>
                );
              })}
            </div>

            <div className="action-row">
              <button type="button" className="primary-button" onClick={handleSubmit}>Enviar respuesta</button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setSelectedOption((currentQuestion?.answer ?? 'A') as 'A' | 'B' | 'C' | 'D')}
              >Respuesta sugerida</button>
            </div>
          </div>

          {feedback.status !== 'idle' && (
            <div className={`feedback-panel ${feedback.status}`}>
              <strong>{feedback.message}</strong>
              <p>{feedback.hint}</p>
            </div>
          )}

          <div className="bottom-summary">
            <div>
              <p>Correctas: <strong>{correctCount}</strong></p>
              <p>Progreso: <strong>{Math.min(currentIndex + 1, questionCount)} / {questionCount}</strong></p>
            </div>
            <button type="button" className="primary-button" onClick={goNextQuestion} disabled={sessionFinished}>{isLastQuestion ? 'Finalizar sesión' : 'Siguiente'}</button>
          </div>

          {sessionFinished && (
            <div className="summary-card-large">
              <p className="section-label">Sesión lista</p>
              <h3>Has completado la práctica</h3>
              <p className="copy">Tu resultado se actualizará en el panel de progreso.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default StudyPage;
