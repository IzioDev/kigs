import { useEffect, useState, Dispatch, SetStateAction } from 'react';

const useDarkMode = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || !localStorage.theme;
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (enabled) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [enabled]);

  return [enabled, setEnabled];
};

export default useDarkMode;