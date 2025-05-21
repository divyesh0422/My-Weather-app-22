import { useState, useEffect } from "react";
import Home from "./pages/Home";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
    
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Home darkMode={darkMode} />
    </>
  );
}

export default App;
