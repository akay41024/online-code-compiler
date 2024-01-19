import Header from "./components/Header"
import {ThemeProvider} from "./context/theme"
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = () => {
    setThemeMode("dark");
  }
  const lightTheme = () => {
    setThemeMode("light");
  }

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode])
  return (
    <ThemeProvider value={{darkTheme, lightTheme, themeMode}}>
      <div className="w-full min-h-[100vh] max-h-auto dark:bg-slate-800">
        <Header/>
      </div>
    </ThemeProvider>
  )
}

export default App
