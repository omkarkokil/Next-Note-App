"use client";

import { createContext, useCallback, useState } from "react";

interface MyContextType {
  toggleTheme: string;
  setToggleTheme: (toggleTheme: string) => void;
  setToggle: () => void;
}

export const ThemeContext = createContext<MyContextType>({} as MyContextType);

export const ThemeProvider = ({ children }: { children: any }) => {
  const [toggleTheme, setToggleTheme] = useState("dark");

  const setToggle = useCallback(() => {
    setToggleTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [toggleTheme]);

  return (
    <>
      <ThemeContext.Provider value={{ toggleTheme, setToggleTheme, setToggle }}>
        <div className={`transition-all ${toggleTheme}`}>{children}</div>
      </ThemeContext.Provider>
    </>
  );
};
