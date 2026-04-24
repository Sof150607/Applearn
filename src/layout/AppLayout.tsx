import type { ReactNode } from 'react';
import logo from '../assets/apple-logo.svg';
import type { NavigationSection } from '../types';
import Navbar from '../components/Navbar';

type AppLayoutProps = {
  activeSection: NavigationSection;
  onNavigate: (section: NavigationSection) => void;
  onLogout: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

const AppLayout = ({ activeSection, onNavigate, onLogout, children, title, subtitle }: AppLayoutProps) => {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-row">
          <img src={logo} alt="Applearn logo" className="brand-logo" />
          <div>
            <p className="eyebrow">Applearn</p>
            <h1>{title ?? 'Espacio de estudio'}</h1>
            {subtitle && <p className="copy">{subtitle}</p>}
          </div>
        </div>
      </header>
      <main className="page-content">{children}</main>
      <Navbar active={activeSection} onSelect={onNavigate} onLogout={onLogout} />
    </div>
  );
};

export default AppLayout;
