import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Button, Box } from '@mui/material';

function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    // Create the MUI theme with light and dark modes
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* This applies the theme globally */}
                <Button variant="contained" onClick={toggleDarkMode}>
                    Toggle Dark Mode
                </Button>
        </ThemeProvider>
    );
}

export default ThemeToggle;
