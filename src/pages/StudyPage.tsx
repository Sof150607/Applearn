import { useMemo, useState } from 'react';
import { difficultyOptions, pickQuestion, timeOptions } from '../data/questions';
import type { Difficulty, Question, TimeOption } from '../types';

const getAdjustedDifficulty = (correct: boolean, current: Difficulty): Difficulty => {
  const order: Difficulty[] = ['fácil', 'medio', 'difícil'];
  const index = order.indexOf(current);
  if (correct && index < order.length - 1) return order[index + 1];
  if (!correct && index > 0) return order[index - 1];
  return current;
};

const StudyPage = () => {
  const [timeBudget, setTimeBudget] = useState<TimeOption>('medio');
  const [difficulty, setDifficulty] = useState<Difficulty>('medio');
  const [questionCount, setQuestionCount] = useState(10);
  const [questionSequence, setQuestionSequence] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'correct' | 'incorrect'; message: string; hint?: string; nextDifficulty?: Difficulty }>({ status: 'idle', message: '' });
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questionSequence[currentIndex];
  const timeLabel = useMemo(() => timeOptions.find((option) => option.value === timeBudget)?.label ?? 'Medio tiempo', [timeBudget]);

  const startSession = () => {
    const count = timeOptions.find((option) => option.value === timeBudget)?.questions ?? 10;
    const firstQuestion = pickQuestion(difficulty, []);
    setQuestionCount(count);
    setQuestionSequence([firstQuestion]);
    setCurrentIndex(0);
    setAnswerInput('');
    setFeedback({ status: 'idle', message: '' });
    setCorrectCount(0);
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;
    const normalized = answerInput.trim().toLowerCase();
    const expected = currentQuestion.answer.toLowerCase();
    const isCorrect = normalized === expected;
    const nextDiff = getAdjustedDifficulty(isCorrect, currentQuestion.difficulty);

    setFeedback({
      status: isCorrect ? 'correct' : 'incorrect',
      message: isCorrect ? '¡Correcto! Continúa con confianza.' : 'No fue la mejor respuesta.',
      hint: isCorrect ? currentQuestion.hint : `Pista: ${currentQuestion.hint}`,
      nextDifficulty: nextDiff
    });

    if (isCorrect) setCorrectCount((value) => value + 1);
  };

  const goNextQuestion = () => {
    if (!currentQuestion) return;
    const nextDiff = feedback.nextDifficulty ?? currentQuestion.difficulty;
    const usedIds = questionSequence.map((question) => question.id);
    const nextQuestion = pickQuestion(nextDiff, usedIds);

    if (currentIndex + 1 >= questionCount) {
      return;
    }

    setQuestionSequence((prev) => [...prev, nextQuestion]);
    setCurrentIndex((prev) => prev + 1);
    setAnswerInput('');
    setFeedback({ status: 'idle', message: '' });
  };

  const sessionFinished = questionSequence.length > 0 && currentIndex + 1 >= questionCount;

  return (
    <section className="card study-card">
      <div className="section-row">
        <div>
          <p className="section-label">Sesión adaptativa</p>
          <h2>Comienza un recorrido con feedback en tiempo real.</h2>
          <p className="copy">Escoge cuánto tiempo tienes y qué dificultad prefieres antes de iniciar la sesión.</p>
        </div>
      </div>

      {!questionSequence.length ? (
        <div className="form-grid">
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

          <button type="button" className="primary-button" onClick={startSession}>Iniciar sesión</button>
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
            <p className="answer-label">Elige una opción o escribe tu respuesta</p>
            <div className="quick-actions">
              {currentQuestion?.options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  className={answerInput === option ? 'chip active' : 'chip'}
                  onClick={() => setAnswerInput(option)}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>

            <textarea
              className="answer-input"
              value={answerInput}
              onChange={(event) => setAnswerInput(event.target.value)}
              rows={3}
              placeholder="Escribe tu respuesta aquí..."
            />

            <div className="action-row">
              <button type="button" className="secondary-button" onClick={handleSubmit}>Enviar respuesta</button>
              <button type="button" className="primary-button" onClick={() => setAnswerInput(currentQuestion?.options[0] ?? '')}>Respuesta sugerida</button>
            </div>
          </div>

          {feedback.status !== 'idle' && (
            <div className={`feedback-panel ${feedback.status}`}>
              <strong>{feedback.message}</strong>
              <p>{feedback.hint}</p>
              <p className="footnote">Próxima dificultad: <strong>{feedback.nextDifficulty}</strong></p>
            </div>
          )}

          <div className="bottom-summary">
            <div>
              <p>Correctas: <strong>{correctCount}</strong></p>
              <p>Progreso: <strong>{Math.min(currentIndex + 1, questionCount)} / {questionCount}</strong></p>
            </div>
            <button type="button" className="primary-button" onClick={goNextQuestion} disabled={sessionFinished}>Siguiente</button>
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
