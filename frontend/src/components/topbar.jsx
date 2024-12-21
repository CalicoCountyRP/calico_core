import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../assets/cclogo.png';
import { MdLogout } from "react-icons/md";

const handleLogout = () => {
    localStorage.clear();

    // Add your logout logic here
    console.log('Logout button clicked');
};

const TopBar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#333' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Calico County Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                    Calico County Core
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button 
                        color="inherit" 
                        onClick={handleLogout} 
                        href={`${import.meta.env.AppBar}/logout`}
                        startIcon={<MdLogout />}
                    >
                        Logout
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;