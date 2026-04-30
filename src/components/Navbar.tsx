import type { NavigationSection } from '../types';

type NavbarProps = {
  active: NavigationSection;
  onSelect: (section: NavigationSection) => void;
  onLogout: () => void;
};

const navItems: { key: NavigationSection; label: string; icon: string }[] = [
  {
    key: 'dashboard',
    label: 'Inicio',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>`
  },
  {
    key: 'study',
    label: 'Estudios',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>`
  },
  {
    key: 'progress',
    label: 'Progreso',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>`
  },
  {
    key: 'profile',
    label: 'Perfil',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>`
  }
];

const Navbar = ({ active, onSelect, onLogout }: NavbarProps) => {
  return (
    <nav className="app-nav">
      <div className="nav-group">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={active === item.key ? 'nav-button active' : 'nav-button'}
            onClick={() => onSelect(item.key)}
          >
            <span className="nav-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
            {item.label}
          </button>
        ))}
      </div>
      <button type="button" className="nav-button logout-button" onClick={onLogout}>
        <span className="nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16,17 21,12 16,7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </span>
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Navbar;
