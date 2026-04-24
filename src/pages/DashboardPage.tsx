import type { NavigationSection } from '../types';

type DashboardPageProps = {
  userName: string;
};

const DashboardPage = ({ userName }: DashboardPageProps) => {
  return (
    <section className="card dashboard-card">
      <div className="section-row">
        <div>
          <p className="section-label">Hola, {userName}</p>
          <h2>Tu centro de estudio inteligente</h2>
          <p className="copy">Comienza una sesión adaptativa, revisa tu progreso o ajusta tu perfil. Applearn está listo para acompañarte.</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="stat-card">
          <span>Foco recomendado</span>
          <strong>4 sesiones esta semana</strong>
        </div>
        <div className="stat-card">
          <span>Ritmo adaptativo</span>
          <strong>3 niveles de dificultad</strong>
        </div>
        <div className="stat-card">
          <span>Soporte de tiempos</span>
          <strong>15 / 10 preguntas</strong>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
