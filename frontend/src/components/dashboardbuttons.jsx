import React from 'react';
import Button from '@mui/material/Button';
import '../App.css';

const DashboardButtons = () => {
    return (
        <div className="dashboard-buttons">
            <Button variant="contained" className="dashboard-button" href="https://example.com/rules" target="_blank" rel="noopener noreferrer">
                Rules
            </Button>
            <Button variant="contained" className="dashboard-button" href="#" target="_blank" rel="noopener noreferrer">
                Connect
            </Button>
            <Button variant="contained" className="dashboard-button" href="https://discord.gg/ryRfCvnyuJ" target="_blank" rel="noopener noreferrer">
                Discord
            </Button>
        </div>
    );
};

export default DashboardButtons;