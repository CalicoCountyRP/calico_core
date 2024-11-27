import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout button clicked');
};

const TopBar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#333' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Calico County Core
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;