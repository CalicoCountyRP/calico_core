import React from 'react';
import Button from '@mui/material/Button';
import { FaDiscord } from 'react-icons/fa';

function DiscordButton() {
    return (
        <div>
            <Button
                className="discordButton"
                variant="contained"
                href={`${import.meta.env.VITE_REACT_API_URL}/auth/discord/login`}
                startIcon={<FaDiscord />}
            >
                Login With Discord
            </Button>
        </div>
    );
}

export default DiscordButton;