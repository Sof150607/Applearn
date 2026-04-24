type ProfilePageProps = {
  userName: string;
};

const ProfilePage = ({ userName }: ProfilePageProps) => {
  return (
    <section className="card profile-card">
      <div className="section-row profile-header">
        <div>
          <p className="section-label">Perfil</p>
          <h2>{userName}</h2>
          <p className="copy">Gestiona tu cuenta, revisa tus ajustes y mira qué sigue en tu plan de estudio.</p>
        </div>
        <div className="avatar-badge">{userName.charAt(0)}</div>
      </div>

      <div className="profile-grid">
        <div className="profile-info-card">
          <span>Correo</span>
          <strong>{userName.toLowerCase()}@demo.com</strong>
        </div>
        <div className="profile-info-card">
          <span>Objetivo</span>
          <strong>Mejor concentración</strong>
        </div>
        <div className="profile-info-card">
          <span>Sesiones</span>
          <strong>10 completadas</strong>
        </div>
      </div>

      <div className="summary-card">
        <p className="copy">Puedes actualizar tu objetivo y preparar tu próximo estudio en el panel de Sesiones.</p>
      </div>
    </section>
  );
};

export default ProfilePage;
