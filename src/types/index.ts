export type TimeOption = 'mucho' | 'medio' | 'poco';
export type Difficulty = 'fácil' | 'medio' | 'difícil';
export type NavigationSection = 'dashboard' | 'study' | 'progress' | 'profile';

export type Question = {
  id: number;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  answer: string;
  hint: string;
};
