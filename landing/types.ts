
export type NavigationItem = 'dashboard' | 'tasks' | 'notes' | 'settings';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  color: string;
}

export interface ThemeColors {
  primary: string;
  accent: string;
  gradientStart: string;
  gradientEnd: string;
}
