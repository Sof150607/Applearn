import { useUser } from '../context/UserContext';

const ProfilePage = () => {
  const { userData, toggleTheme } = useUser();

  return (
    <section className="card profile-card">
      <div className="section-row profile-header">
        <div>
          <p className="section-label">Perfil</p>
          <h2>{userData.name}</h2>
          <p className="copy">Gestiona tu cuenta, revisa tus ajustes y mira qué sigue en tu plan de estudio.</p>
        </div>
        <div className="avatar-badge">{userData.name.charAt(0)}</div>
      </div>

      <div className="profile-grid">
        <div className="profile-info-card">
          <span>Correo</span>
          <strong>{userData.name.toLowerCase()}@demo.com</strong>
        </div>
        <div className="profile-info-card">
          <span>Objetivo</span>
          <strong>Mejor concentración</strong>
        </div>
        <div className="profile-info-card">
          <span>Sesiones</span>
          <strong>{userData.totalSessions} completadas</strong>
        </div>
      </div>

      <div className="settings-section">
        <h3>Configuración</h3>
        <div className="setting-item">
          <span>Modo de tema</span>
          <button type="button" className="toggle-button" onClick={toggleTheme}>
            {userData.theme === 'light' ? '🌞 Claro' : '🌙 Oscuro'}
          </button>
        </div>
      </div>

      <div className="summary-card">
        <p className="copy">Puedes actualizar tu objetivo y preparar tu próximo estudio en el panel de Sesiones.</p>
      </div>
    </section>
  );
};

export default ProfilePage;
