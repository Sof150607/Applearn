import { createContext, useContext, useState, ReactNode } from 'react';

export interface UserSession {
  id: string;
  date: Date;
  topic: string;
  timeOption: 'mucho' | 'medio' | 'poco';
  difficulty: 'fácil' | 'medio' | 'difícil';
  questionsCount: number;
  correctAnswers: number;
  accuracy: number;
  averageTimePerQuestion: number; // en segundos, simulado
}

export interface UserData {
  name: string;
  sessions: UserSession[];
  totalSessions: number;
  averageAccuracy: number;
  totalQuestions: number;
  totalCorrect: number;
  theme: 'light' | 'dark';
}

const UserContext = createContext<{
  userData: UserData;
  addSession: (session: Omit<UserSession, 'id' | 'date'>) => void;
  toggleTheme: () => void;
} | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    name: 'Estudiante',
    sessions: [
      {
        id: 'test-1',
        date: new Date(),
        topic: 'Test',
        timeOption: 'medio',
        difficulty: 'medio',
        questionsCount: 10,
        correctAnswers: 8,
        accuracy: 80,
        averageTimePerQuestion: 45,
      }
    ],
    totalSessions: 1,
    averageAccuracy: 80,
    totalQuestions: 10,
    totalCorrect: 8,
    theme: 'light',
  });

  const addSession = (sessionData: Omit<UserSession, 'id' | 'date'>) => {
    console.log('Agregando sesión:', sessionData);
    const newSession: UserSession = {
      ...sessionData,
      id: Date.now().toString(),
      date: new Date(),
    };

    setUserData(prev => {
      const newSessions = [...prev.sessions, newSession];
      const newTotalSessions = newSessions.length;
      const newTotalQuestions = newSessions.reduce((sum, s) => sum + s.questionsCount, 0);
      const newTotalCorrect = newSessions.reduce((sum, s) => sum + s.correctAnswers, 0);
      const newAverageAccuracy = newTotalQuestions > 0 ? (newTotalCorrect / newTotalQuestions) * 100 : 0;

      return {
        ...prev,
        sessions: newSessions,
        totalSessions: newTotalSessions,
        averageAccuracy: newAverageAccuracy,
        totalQuestions: newTotalQuestions,
        totalCorrect: newTotalCorrect,
      };
    });
  };

  const toggleTheme = () => {
    setUserData(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <UserContext.Provider value={{ userData, addSession, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
};
