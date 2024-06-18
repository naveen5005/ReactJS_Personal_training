import React from "react";
import { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const themeToggle = () => {
    console.log("themeToggle Called !!");
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div>
      <ThemeContext.Provider value={{ theme, themeToggle }}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};

export default ThemeProvider;
