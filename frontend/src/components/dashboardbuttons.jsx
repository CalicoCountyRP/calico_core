import React from 'react';
import Button from '@mui/material/Button';
import '../App.css'; // Make sure to import the CSS file

const DashboardButtons = () => {
    return (
        <div className="dashboard-buttons">
            <Button
                variant="contained"
                sx={{ margin: 1 }} // Add margin using the sx prop
                href="https://example.com/rules"
                target="_blank"
                rel="noopener noreferrer"
            >
                Rules
            </Button>
            <Button
                variant="contained"
                sx={{ margin: 1 }} // Add margin using the sx prop
                href="#"
                target="_blank"
                rel="noopener noreferrer"
            >
                Connect
            </Button>
            <Button
                variant="contained"
                sx={{ margin: 1 }} // Add margin using the sx prop
                href="https://discord.gg/ryRfCvnyuJ"
                target="_blank"
                rel="noopener noreferrer"
            >
                Discord
            </Button>
        </div>
    );
};

export default DashboardButtons;