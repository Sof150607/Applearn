const ProgressPage = () => {
  return (
    <section className="card progress-card">
      <p className="section-label">Progreso de estudio</p>
      <h2>Tu avance reciente</h2>
      <div className="result-grid">
        <div className="result-card">
          <span>Sesiones</span>
          <strong>1</strong>
        </div>
        <div className="result-card">
          <span>Atención</span>
          <strong>78%</strong>
        </div>
        <div className="result-card">
          <span>Retención</span>
          <strong>84%</strong>
        </div>
      </div>
      <p className="copy">El sistema recomienda mantener sesiones cortas y adaptativas para un mejor rendimiento cognitivo.</p>
    </section>
  );
};

export default ProgressPage;
