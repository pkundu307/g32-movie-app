import { useEffect } from "react";

import useLocalStorage from "./useLocalStorage";

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toogleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return [theme, toogleTheme,setTheme];
}