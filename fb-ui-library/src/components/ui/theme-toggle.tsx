'use client';

import * as React from 'react';
import { Button } from './button';
import { Moon, Sun } from 'lucide-react';
// import { Settings } from 'lucide-react';

interface ThemeToggleProps {
  theme?: string;
  setTheme: (theme: string) => void;
  className?: string;
}

export function ThemeToggle({ theme, setTheme, className }: ThemeToggleProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={className}
      >
        <span className="h-4 w-4" />
      </Button>
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    }
    // else if (theme === 'dark') {
    //   setTheme('system');
    // }
    else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'light') {
      return <Sun className="h-4 w-4" />; //"☀️";
    } else {
      return <Moon className="h-4 w-4" />; //"🌙";
    }
    // else if (theme === 'dark') {
    //   return <Moon className="h-4 w-4" />; //"🌙";
    // }
    // else {
    //   return <Settings className="h-4 w-4" />; // "💻";
    // }
  };

  const getThemeLabel = () => {
    if (theme === 'system') {
      return 'System';
    }
    return theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : 'Theme';
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={cycleTheme}
      className={className}
      title={`Current theme: ${getThemeLabel()}. Click to cycle themes.`}
    >
      {getThemeIcon()}
    </Button>
  );
}
