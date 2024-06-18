import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

const ThemeToggle = () => {
  const { theme, themeToggle } = useContext(ThemeContext);
  console.log(useContext(ThemeContext))
  return (
    <button onClick={themeToggle}>
      Toggle Theme (Current: {theme})
    </button>
  );
};

export default ThemeToggle;
