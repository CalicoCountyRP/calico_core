import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import mapImage from '../assets/rdr.jpg'; // Import the image
import '../App.css'; // Import the CSS file

const RealEstateModal = ({ open, onClose, business, isBusiness }) => {
    if (!business) return null;

    // Image dimensions
    const imageWidth = 7200;
    const imageHeight = 5400;

    console.log("a", business)

    // Convert business coordinates to percentages
    const markerStyle = {
        position: 'absolute',
        top: `${(business.latitude / imageHeight) * 100}%`, // Convert to percentage
        left: `${(business.longitude / imageWidth) * 100}%`, // Convert to percentage
        transform: 'translate(-50%, -50%)',
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        borderRadius: '50%',
    };

    console.log('Latitude:', business.latitude);
    console.log('Longitude:', business.longitude);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 600, 
                bgcolor: 'background.paper', 
                boxShadow: 24, 
                p: 4,
                overflow: 'hidden',
                position: 'relative',
            }}>
                <img src={business.image} alt={business.name} style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
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
                {isBusiness && (
                <Typography sx={{ mt: 2 }}>
                    Shop Type: {business.type}
                </Typography>
                )}
                <div style={{ position: 'relative', width: '100%', height: '150px', marginTop: '20px' }}>
                    <img src={mapImage} alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={markerStyle}></div>
                </div>
                <Button onClick={onClose} sx={{ mt: 2 }}>Close</Button>
            </Box>
        </Modal>
    );
};

export default RealEstateModal;