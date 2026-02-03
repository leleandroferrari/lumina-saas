
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeColors } from './types';

interface ThemeContextType {
  theme: ThemeColors;
  setTheme: (theme: ThemeColors) => void;
}

const defaultTheme: ThemeColors = {
  primary: '#4F46E5', // Indigo
  accent: '#F472B6', // Pink
  gradientStart: '#818CF8',
  gradientEnd: '#C084FC'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ 
        // @ts-ignore
        '--primary-color': theme.primary,
        '--accent-color': theme.accent,
        '--gradient-start': theme.gradientStart,
        '--gradient-end': theme.gradientEnd,
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
