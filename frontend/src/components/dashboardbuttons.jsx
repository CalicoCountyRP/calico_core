import React from 'react';
import Button from '@mui/material/Button';
import { FaDiscord, FaArrowCircleRight } from 'react-icons/fa';
import { FaBookBookmark } from "react-icons/fa6";
import '../App.css'; // Make sure to import the CSS file

const DashboardButtons = () => {
    return (
        <div className="dashboard-buttons">
            <Button
                variant="contained"
                href="https://rules.calicocountyrp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="dashboard-button"
            >
                <FaBookBookmark className="dashboard-button-icon" />
                <span className="dashboard-button-text">Rules</span>
            </Button>
            <Button
                variant="contained"
                href="redm://connect/play.calicocountyrp.com:30140"
                target="_blank"
                rel="noopener noreferrer"
                className="dashboard-button"
            >
                <FaArrowCircleRight className="dashboard-button-icon" />
                <span className="dashboard-button-text">Connect</span>
            </Button>
            <Button
                variant="contained"
                href="https://discord.gg/ryRfCvnyuJ"
                target="_blank"
                rel="noopener noreferrer"
                className="dashboard-button"
            >
                <FaDiscord className="dashboard-button-icon" />
                <span className="dashboard-button-text">Discord</span>
            </Button>
        </div>
    );
};

export default DashboardButtons;