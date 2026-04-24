import { useState } from 'react';
import type { FormEvent } from 'react';

type LoginPageProps = {
  onLogin: (name: string) => void;
};

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Por favor completa correo y contraseña.');
      return;
    }
    setError('');
    const displayName = email.split('@')[0] || 'Estudiante';
    onLogin(displayName.charAt(0).toUpperCase() + displayName.slice(1));
  };

  return (
    <section className="card auth-card">
      <div className="hero-content">
        <div className="hero-illustration">🍎</div>
        <div>
          <p className="section-label">Bienvenido a Applearn</p>
          <h2>Inicia sesión para empezar tu sesión de estudio adaptativa.</h2>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input-field"
            type="email"
            placeholder="tucorreo@universidad.com"
          />
        </div>

        <div className="field-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input-field"
            type="password"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        {error && <p className="validation-error">{error}</p>}

        <div className="auth-actions">
          <button type="submit" className="primary-button">Entrar</button>
          <button type="button" className="secondary-button" onClick={() => onLogin('Invitado')}>Entrar como invitado</button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
