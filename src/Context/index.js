import React from "react";
import { useState } from "react";

const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(true);

    const onDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <ThemeContext.Provider
            value={{ darkMode, onDarkMode }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext,ThemeProvider}