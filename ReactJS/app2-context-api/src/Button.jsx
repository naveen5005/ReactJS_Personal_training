import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

const Button = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const styles = {
    light: {
      backgroundColor: '#fff',
      color: '#000',
    },
    dark: {
      backgroundColor: '#000',
      color: '#fff',
    },
  };

  return (
    <button style={styles[theme]}>{children}</button>
  );
};

export default Button;
