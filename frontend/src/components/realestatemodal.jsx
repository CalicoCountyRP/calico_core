import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const RealEstateModal = ({ open, onClose, business }) => {
    if (!business) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 400, 
                bgcolor: 'background.paper', 
                boxShadow: 24, 
                p: 4 
            }}>
                <Typography variant="h6" component="h2">
                    {business.name}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Property ID: {business.id}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Location: {business.location}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Price: ${business.price}
                </Typography>
                <Button onClick={onClose} sx={{ mt: 2 }}>Close</Button>
            </Box>
        </Modal>
    );
};

export default RealEstateModal;