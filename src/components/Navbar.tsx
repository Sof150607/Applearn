import type { NavigationSection } from '../types';

type NavbarProps = {
  active: NavigationSection;
  onSelect: (section: NavigationSection) => void;
  onLogout: () => void;
};

const navItems: { key: NavigationSection; label: string }[] = [
  { key: 'dashboard', label: 'Inicio' },
  { key: 'study', label: 'Estudios' },
  { key: 'progress', label: 'Progreso' },
  { key: 'profile', label: 'Perfil' }
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
            {item.label}
          </button>
        ))}
      </div>
      <button type="button" className="nav-button logout-button" onClick={onLogout}>Cerrar sesión</button>
    </nav>
  );
};

export default Navbar;
