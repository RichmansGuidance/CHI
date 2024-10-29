import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Heroes from './pages/Heroes';
import About from './pages/About';
import CharacterDetail from './components/CharacterDetail';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { Switch as MuiSwitch } from '@mui/material'; 
import './styles/styles.css'; 

const ThemeSwitch = () => {
    const { darkMode, setDarkMode } = useTheme();
    
    return (
        <div className="theme-switch-container">
            <MuiSwitch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
            />
        </div>
    );
};

const App = () => {
    const { theme } = useTheme();

    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <ThemeSwitch />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/heroes" element={<Heroes />}>
                        <Route path=":id" element={<CharacterDetail />} />
                    </Route>
                    <Route path="/about" element={<About />} />
                </Routes>
            </Router>
        </MuiThemeProvider>
    );
};
// спробував реалізувати Контекст теми через провайдер не знаю чи правильно вийшло
const WrappedApp = () => (
    <ThemeProvider>
        <App /> 
    </ThemeProvider>
);

export default WrappedApp;
