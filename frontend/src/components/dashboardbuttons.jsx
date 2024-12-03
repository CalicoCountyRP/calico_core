import React from 'react';
import Button from '@mui/material/Button';
import '../App.css'; // Make sure to import the CSS file

const DashboardButtons = () => {
    return (
        <div className="dashboard-buttons">
            <Button
                variant="contained"
                href="https://rules.calicocountyrp.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                Rules
            </Button>
            <Button
                variant="contained"
                href="redm://connect/play.calicocountyrp.com:30140"
                target="_blank"
                rel="noopener noreferrer"
            >
                Connect
            </Button>
            <Button
                variant="contained"
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