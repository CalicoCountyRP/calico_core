import React from 'react';
import Button from '@mui/material/Button';


function DiscordButton() {
    return (
    <div>
        <Button className="discordButton" variant="contained" href='http://localhost:8081/auth/discord/login'> Login With Discord </Button>
    </div>
    )
}

export default DiscordButton;