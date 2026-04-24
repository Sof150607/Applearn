import { useMemo, useState } from 'react';
import './App.css';

type TimeOption = 'mucho' | 'medio' | 'poco';
type Difficulty = 'fácil' | 'medio' | 'difícil';
type Screen = 'welcome' | 'setup' | 'session' | 'summary';

type Question = {
  id: number;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  answer: string;
  hint: string;
};

const timeOptions: { value: TimeOption; label: string; questions: number }[] = [
  { value: 'mucho', label: 'Mucho tiempo', questions: 15 },
  { value: 'medio', label: 'Medio tiempo', questions: 10 },
  { value: 'poco', label: 'Poco tiempo', questions: 5 }
];

const difficultyOptions: Difficulty[] = ['fácil', 'medio', 'difícil'];

const questionBank: Question[] = [
  { id: 1, difficulty: 'fácil', prompt: '¿Qué ayuda a mantener la atención al estudiar?', options: ['Hacer descansos cortos', 'Estudiar de noche sin parar', 'Usar redes sociales'], answer: 'Hacer descansos cortos', hint: 'Busca una estrategia de ritmo de estudio.' },
  { id: 2, difficulty: 'fácil', prompt: '¿Cuál es una práctica útil para estudiar mejor?', options: ['Leer sin plan', 'Hacer resúmenes', 'Escuchar música fuerte'], answer: 'Hacer resúmenes', hint: 'Organizar ideas es clave.' },
  { id: 3, difficulty: 'fácil', prompt: '¿Qué reduce las distracciones?', options: ['Silenciar notificaciones', 'Mantener el móvil visible', 'Abrir muchas pestañas'], answer: 'Silenciar notificaciones', hint: 'Piensa en eliminar interrupciones.' },
  { id: 4, difficulty: 'fácil', prompt: '¿Qué favorece la concentración?', options: ['Planificar el tiempo', 'Dejar todo para después', 'Estudiar con hambre'], answer: 'Planificar el tiempo', hint: 'La organización ayuda a enfocarse.' },
  { id: 5, difficulty: 'fácil', prompt: '¿Qué significa “mind-wandering”?', options: ['Pensar en otra cosa mientras estudias', 'Leer más rápido', 'Dormir temprano'], answer: 'Pensar en otra cosa mientras estudias', hint: 'Es una distracción interna.' },
  { id: 6, difficulty: 'medio', prompt: 'Cuando respondes bien dos veces seguido, el sistema debe:', options: ['Aumentar dificultad', 'Pedir pausa', 'Cambiar tema'], answer: 'Aumentar dificultad', hint: 'Busca un reto mayor si vas bien.' },
  { id: 7, difficulty: 'medio', prompt: 'Si fallas varias preguntas, lo ideal es:', options: ['Ofrecer apoyo', 'Ignorar el error', 'Acelerar más'], answer: 'Ofrecer apoyo', hint: 'El sistema debe ayudar, no frustrar.' },
  { id: 8, difficulty: 'medio', prompt: '¿Cuál es una señal de baja atención?', options: ['Respuestas lentas y dudas', 'Foco claro en el contenido', 'Leer sin cometer errores'], answer: 'Respuestas lentas y dudas', hint: 'Los retrasos suelen indicar distracción.' },
  { id: 9, difficulty: 'medio', prompt: '¿Qué hace un buen sistema adaptativo?', options: ['Ajusta preguntas según desempeño', 'Presenta siempre lo mismo', 'Elimina retroalimentación'], answer: 'Ajusta preguntas según desempeño', hint: 'Personalización es la clave.' },
  { id: 10, difficulty: 'medio', prompt: '¿Qué mejora la retención de información?', options: ['Revisar lo aprendido', 'Leer una sola vez rápido', 'Abrir muchas apps'], answer: 'Revisar lo aprendido', hint: 'La revisión refuerza el recuerdo.' },
  { id: 11, difficulty: 'difícil', prompt: '¿Qué combina la solución propuesta?', options: ['AI adaptativa, atención y emoción', 'Solo contenido fijo', 'Solo seguimiento de tiempo'], answer: 'AI adaptativa, atención y emoción', hint: 'Piensa en los tres pilares del problema.' },
  { id: 12, difficulty: 'difícil', prompt: '¿Qué representa la vigilancia de la atención?', options: ['Detectar cuándo se pierde foco', 'Aumentar distractores', 'Eliminar toda interacción'], answer: 'Detectar cuándo se pierde foco', hint: 'No es castigar, es interpretar señales.' },
  { id: 13, difficulty: 'difícil', prompt: '¿Cuál es el riesgo de un sistema adaptativo mal diseñado?', options: ['Manipulación o sobrecarga', 'Mejora de aprendizaje', 'Más claridad'], answer: 'Manipulación o sobrecarga', hint: 'Piensa en cuidado ético.' },
  { id: 14, difficulty: 'difícil', prompt: '¿Qué aporta el feedback inmediato?', options: ['Permite corregir rápido', 'Genera más confusión', 'Hace el estudio más lento'], answer: 'Permite corregir rápido', hint: 'La respuesta rápida es positiva.' },
  { id: 15, difficulty: 'difícil', prompt: '¿Qué es una intervención adaptativa útil?', options: ['Simplificar contenido si hay errores', 'Ignorar fallos y seguir igual', 'Aumentar presión sin apoyo'], answer: 'Simplificar contenido si hay errores', hint: 'El sistema debe bajar la carga cuando hay problemas.' }
];

const pickQuestion = (difficulty: Difficulty, usedIds: number[]) => {
  const pool = questionBank.filter((question) => question.difficulty === difficulty && !usedIds.includes(question.id));
  if (pool.length > 0) return pool[Math.floor(Math.random() * pool.length)];
  const fallback = questionBank.filter((question) => !usedIds.includes(question.id));
  return fallback[Math.floor(Math.random() * fallback.length)];
};

const App = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [timeBudget, setTimeBudget] = useState<TimeOption>('medio');
  const [difficulty, setDifficulty] = useState<Difficulty>('medio');
  const [questionCount, setQuestionCount] = useState(10);
  const [questionSequence, setQuestionSequence] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'correct' | 'incorrect'; message: string; hint?: string; nextDifficulty?: Difficulty }>({ status: 'idle', message: '' });
  const [correctCount, setCorrectCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [usedAnswers, setUsedAnswers] = useState<string[]>([]);

  const timeLabel = useMemo(() => timeOptions.find((opt) => opt.value === timeBudget)?.label ?? 'Medio tiempo', [timeBudget]);

  const startSession = () => {
    const count = timeOptions.find((opt) => opt.value === timeBudget)?.questions ?? 10;
    const firstQuestion = pickQuestion(difficulty, []);
    setQuestionCount(count);
    setQuestionSequence([firstQuestion]);
    setCurrentIndex(0);
    setAnswerInput('');
    setFeedback({ status: 'idle', message: '' });
    setCorrectCount(0);
    setSessionComplete(false);
    setUsedAnswers([]);
    setScreen('session');
  };

  const currentQuestion = questionSequence[currentIndex];

  const getAdjustedDifficulty = (correct: boolean, current: Difficulty): Difficulty => {
    const order: Difficulty[] = ['fácil', 'medio', 'difícil'];
    const currentIndex = order.indexOf(current);
    if (correct && currentIndex < order.length - 1) return order[currentIndex + 1];
    if (!correct && currentIndex > 0) return order[currentIndex - 1];
    return current;
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;

    const normalized = answerInput.trim().toLowerCase();
    const expected = currentQuestion.answer.toLowerCase();
    const isCorrect = normalized === expected;
    const nextDiff = getAdjustedDifficulty(isCorrect, currentQuestion.difficulty);

    if (isCorrect) {
      setCorrectCount((value) => value + 1);
      setFeedback({ status: 'correct', message: '¡Excelente! Respuesta correcta.', hint: currentQuestion.hint, nextDifficulty: nextDiff });
    } else {
      setFeedback({ status: 'incorrect', message: 'No es correcto aún.', hint: `Pista: ${currentQuestion.hint}`, nextDifficulty: nextDiff });
    }

    setUsedAnswers((prev) => [...prev, answerInput]);
  };

  const goNext = () => {
    if (!currentQuestion) return;
    const nextDiff = feedback.nextDifficulty ?? currentQuestion.difficulty;
    const usedIds = questionSequence.map((q) => q.id);
    const nextQuestion = pickQuestion(nextDiff, usedIds);
    const nextIndex = currentIndex + 1;

    if (nextIndex >= questionCount) {
      setSessionComplete(true);
      setScreen('summary');
      return;
    }

    setQuestionSequence((prev) => [...prev, nextQuestion]);
    setCurrentIndex(nextIndex);
    setAnswerInput('');
    setFeedback({ status: 'idle', message: '' });
  };

  const summaryMessage = useMemo(() => {
    const accuracy = Math.round((correctCount / questionCount) * 100);
    if (accuracy >= 80) return 'Has mantenido un gran ritmo y enfoque.';
    if (accuracy >= 50) return 'Buen avance, sigue con esta estrategia.';
    return 'Puedes mejorar con más práctica y apoyo adaptativo.';
  }, [correctCount, questionCount]);

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <p className="eyebrow">Applearn</p>
          <h1>Sesión de estudio adaptativa</h1>
        </div>
        <div className="status-chip">{timeLabel}</div>
      </div>

      <main className="page-content">
        {screen === 'welcome' && (
          <section className="card hero-card">
            <div className="hero-content">
              <div className="hero-illustration">🧠</div>
              <div>
                <p className="section-label">Enfócate mejor</p>
                <h2>Entrena tu concentración con un flujo inteligente.</h2>
                <p className="copy">Selecciona tiempo y dificultad, responde preguntas y recibe retroalimentación adaptativa.</p>
              </div>
            </div>
            <button className="primary-button" onClick={() => setScreen('setup')}>Iniciar sesión de estudio</button>
          </section>
        )}

        {screen === 'setup' && (
          <section className="card setup-card">
            <p className="section-label">Configuración rápida</p>
            <h2>Elegir tiempo y dificultad</h2>
            <div className="form-grid">
              <div className="option-block">
                <strong>¿Cuánto tiempo tienes?</strong>
                {timeOptions.map((option) => (
                  <button
                    key={option.value}
                    className={timeBudget === option.value ? 'option-button active' : 'option-button'}
                    onClick={() => setTimeBudget(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="option-block">
                <strong>Selecciona dificultad</strong>
                {difficultyOptions.map((level) => (
                  <button
                    key={level}
                    className={difficulty === level ? 'option-button active' : 'option-button'}
                    onClick={() => setDifficulty(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className="summary-card">
              <p>Tu sesión incluirá hasta <strong>{timeOptions.find((option) => option.value === timeBudget)?.questions}</strong> preguntas con dificultad <strong>{difficulty}</strong>.</p>
            </div>
            <div className="action-row">
              <button className="secondary-button" onClick={() => setScreen('welcome')}>Volver</button>
              <button className="primary-button" onClick={startSession}>Comenzar sesión</button>
            </div>
          </section>
        )}

        {screen === 'session' && currentQuestion && (
          <section className="card session-card">
            <div className="session-header">
              <div>
                <p className="section-label">Pregunta {currentIndex + 1} de {questionCount}</p>
                <h2>{currentQuestion.prompt}</h2>
              </div>
              <div className="metric-chip">Tiempo: {timeLabel}</div>
            </div>

            <div className="answer-card">
              <p className="answer-label">Selecciona o escribe tu respuesta</p>
              <div className="quick-actions">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={option}
                    className={answerInput === option ? 'chip active' : 'chip'}
                    type="button"
                    onClick={() => setAnswerInput(option)}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </button>
                ))}
              </div>
              <textarea
                className="answer-input"
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                rows={3}
              />
              <div className="action-row">
                <button className="secondary-button" onClick={handleSubmit}>Enviar respuesta</button>
                <button className="primary-button" onClick={() => { setAnswerInput(currentQuestion.options[0]); }}>Respuesta sugerida</button>
              </div>
            </div>

            {feedback.status !== 'idle' && (
              <div className={`feedback-panel ${feedback.status}`}>
                <strong>{feedback.message}</strong>
                <p>{feedback.hint}</p>
                {feedback.nextDifficulty && (
                  <p className="footnote">Próxima dificultad: <strong>{feedback.nextDifficulty}</strong></p>
                )}
              </div>
            )}

            <div className="bottom-summary">
              <div>
                <p>Correctas: <strong>{correctCount}</strong></p>
                <p>Progreso: <strong>{Math.min(currentIndex + 1, questionCount)} / {questionCount}</strong></p>
              </div>
              <button className="primary-button" onClick={goNext}>{currentIndex + 1 >= questionCount ? 'Finalizar' : 'Siguiente'}</button>
            </div>
          </section>
        )}

        {screen === 'summary' && (
          <section className="card summary-card-large">
            <p className="section-label">Resumen de tu sesión</p>
            <h2>¡Bien hecho! Has completado la práctica.</h2>
            <div className="result-grid">
              <div className="result-card">
                <span>Preguntas</span>
                <strong>{questionCount}</strong>
              </div>
              <div className="result-card">
                <span>Correctas</span>
                <strong>{correctCount}</strong>
              </div>
              <div className="result-card">
                <span>Acierto</span>
                <strong>{Math.round((correctCount / questionCount) * 100)}%</strong>
              </div>
            </div>
            <p className="copy">{summaryMessage}</p>
            <div className="action-row">
              <button className="secondary-button" onClick={() => setScreen('setup')}>Nueva sesión</button>
              <button className="primary-button" onClick={() => setScreen('welcome')}>Volver al inicio</button>
            </div>
          </section>
        )}
      </main>

      <nav className="bottom-nav">
        <button className={screen === 'welcome' ? 'nav-button active' : 'nav-button'} onClick={() => setScreen('welcome')}>Inicio</button>
        <button className={screen === 'setup' ? 'nav-button active' : 'nav-button'} onClick={() => setScreen('setup')}>Sesión</button>
        <button className={screen === 'summary' ? 'nav-button active' : 'nav-button'} onClick={() => setScreen('summary')}>Resultado</button>
      </nav>
    </div>
  );
};

export default App;
