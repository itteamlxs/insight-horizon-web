
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0 border-2 text-white hover:bg-white/20 hover:border-white/70 backdrop-blur-sm transition-all duration-300 dark:border-white/50 dark:text-white dark:hover:bg-white/20 dark:hover:border-white/70 bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 hover:text-white dark:bg-transparent"
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;
