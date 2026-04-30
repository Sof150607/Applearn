import { useUser } from '../context/UserContext';

const ProgressPage = () => {
  const { userData } = useUser();

  const totalSessions = userData.sessions.length;
  const totalQuestions = userData.sessions.reduce((sum, session) => sum + session.questionsCount, 0);
  const totalCorrect = userData.sessions.reduce((sum, session) => sum + session.correctAnswers, 0);
  const averageAccuracy = totalSessions > 0 ? (userData.sessions.reduce((sum, session) => sum + session.accuracy, 0) / totalSessions).toFixed(1) : 0;
  const averageTimePerQuestion = totalSessions > 0 ? (userData.sessions.reduce((sum, session) => sum + session.averageTimePerQuestion, 0) / totalSessions).toFixed(1) : 0;
  const topicsStudied = [...new Set(userData.sessions.map(session => session.topic))].length;

  return (
    <section className="card progress-card">
      <div className="section-row">
        <div>
          <p className="section-label">Métricas de progreso</p>
          <h2>Tu rendimiento en el estudio adaptativo</h2>
          <p className="copy">Aquí puedes ver cómo has avanzado en tus sesiones de estudio.</p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-value">{totalSessions}</div>
          <div className="metric-label">Sesiones completadas</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{totalQuestions}</div>
          <div className="metric-label">Preguntas respondidas</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{totalCorrect}</div>
          <div className="metric-label">Respuestas correctas</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{averageAccuracy}%</div>
          <div className="metric-label">Precisión promedio</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{averageTimePerQuestion}s</div>
          <div className="metric-label">Tiempo promedio por pregunta</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{topicsStudied}</div>
          <div className="metric-label">Temas estudiados</div>
        </div>
      </div>

      <div className="sessions-list">
        <h3>Historial de sesiones</h3>
        {userData.sessions.length === 0 ? (
          <p className="copy">No hay sesiones registradas aún. Completa una sesión de estudio para ver tus métricas aquí.</p>
        ) : (
          userData.sessions.map((session, index) => (
            <div key={index} className="session-item">
              <div className="session-header">
                <strong>{session.topic}</strong>
                <span className="session-date">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="session-metrics">
                <span>Preguntas: {session.questionsCount}</span>
                <span>Correctas: {session.correctAnswers}</span>
                <span>Precisión: {session.accuracy.toFixed(1)}%</span>
                <span>Tiempo promedio: {session.averageTimePerQuestion.toFixed(1)}s</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProgressPage;
