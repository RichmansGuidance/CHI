import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, Theme } from '@mui/material/styles';

interface ThemeContextType {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
    theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    // кинув object теми в мемо щоб він створювався ЛИШЕ при зміні теми 
    const theme = useMemo(() => 
        createTheme({
            palette: {
                mode: darkMode ? 'dark' : 'light',
            },
        }), 
    [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
