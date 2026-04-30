import { useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StudyPage from './pages/StudyPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import AppLayout from './layout/AppLayout';
import { UserProvider, useUser } from './context/UserContext';
import type { NavigationSection } from './types';

const AppContent = () => {
  const { userData } = useUser();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<NavigationSection>('dashboard');
  const [userName, setUserName] = useState('Estudiante');

  const handleLogin = (name: string) => {
    setUserName(name);
    setAuthenticated(true);
    setActiveSection('dashboard');
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setActiveSection('dashboard');
  };

  if (!authenticated) {
    return (
      <div className="app-shell auth-screen" data-theme={userData.theme}>
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  const sections = {
    dashboard: <DashboardPage userName={userName} />,
    study: <StudyPage />,
    progress: <ProgressPage />,
    profile: <ProfilePage />
  };

  return (
    <div className="app-shell" data-theme={userData.theme}>
      <AppLayout
        activeSection={activeSection}
        onNavigate={setActiveSection}
        onLogout={handleLogout}
        title="Control de estudio"
        subtitle={`Hola ${userName}, organiza tu estudio de forma adaptativa.`}
      >
        {sections[activeSection]}
      </AppLayout>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;

