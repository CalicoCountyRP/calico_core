import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import mapImage from '../assets/rdr.jpg'; // Import the image
import '../App.css'; // Import the CSS file

const RealEstateModal = ({ open, onClose, business, isBusiness }) => {
    // Add these constants at the top of your component
    const imageWidth = 1024;  // Map image width
    const imageHeight = 768;  // Map image height

    const markerStyle = {
        position: 'absolute',
        top: `${(business?.latitude || 0)}px`,
        left: `${(business?.longitude || 0)}px`,
        transform: 'translate(-50%, -50%)',
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        borderRadius: '50%',
        border: '2px solid white',
        boxShadow: '0 0 4px rgba(0,0,0,0.5)',
        zIndex: 1000
    };

    if (!business) return null;

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
                borderRadius: 2,
                maxHeight: '90vh',
                overflow: 'auto'
            }}>
                {/* Property Image */}
                <img 
                    src={business?.image} 
                    alt={business?.name} 
                    style={{ width: '100%', height: 'auto', marginBottom: '20px' }} 
                />

                {/* Property Details */}
                <Typography variant="h6" component="h2">
                    {business?.name}
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

                {/* Map Container */}
                <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '300px', 
                    marginTop: '20px',
                    overflow: 'hidden',
                    borderRadius: '8px'
                }}>
                    {/* Map Image */}
                    <img 
                        src="/map.png" 
                        alt="Map" 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                        }} 
                    />
                    
                    {/* Location Marker */}
                    {business && <div style={markerStyle} />}
                </div>

                {/* Rest of your modal content */}
                <Button onClick={onClose} sx={{ mt: 2 }}>Close</Button>
            </Box>
        </Modal>
    );
};

export default RealEstateModal;