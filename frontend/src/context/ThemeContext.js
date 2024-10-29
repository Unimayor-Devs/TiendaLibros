// src/context/ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('principal');

  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    document.documentElement.setAttribute('data-theme', selectedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
