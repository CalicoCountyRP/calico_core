import React, { useEffect, useState } from 'react';
import { Grid2, Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loadingrevolver from '../assets/loading.gif';
import RealEstateModal from './realestatemodal';


function BuisnessGrid() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/properties`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();

                const flattenedData = result.flat();
                setData(flattenedData);

                console.log(flattenedData);

            } catch (err) {
                setError(err.message);
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // First, add this helper function at the top of your component
    const parseLocationData = (locationString) => {
        try {
            // Parse the JSON string into an object
            const locationData = JSON.parse(locationString);
            
            // Since it's an array with one object, get the first item
            const coords = locationData[0];
            
            // Return the x and y coordinates
            return {
                x: coords.x || 0,
                y: coords.y || 0
            };
        } catch (error) {
            console.error('Error parsing location data:', error);
            return { x: 0, y: 0 }; // Default coordinates if parsing fails
        }
    };

    // Modified your handleButtonClick function
    const handleButtonClick = (id, taxledger, common_name, price, image, location) => {
        // Parse the location data
        const coords = parseLocationData(location);
        
        // Map the coordinates to pixel values
        const pixelCoords = mapWorldToPixel(coords);

        const info = {
            id: id,
            name: common_name,
            price: price,
            image: image,
            location: `X: ${coords.x.toFixed(2)}, Y: ${coords.y.toFixed(2)}`, // Format for display
            taxledger: taxledger,
            latitude: pixelCoords.py,
            longitude: pixelCoords.px
        };

        setSelectedProperty(info);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProperty(null);
    };

    const worldBounds = {
        minX: -3500,   // the far‑left edge in RedM X coords
        maxX:  5500,   // the far‑right edge
        minY: -4500,   // the bottom
        maxY:  7000    // the top
    };

    // your actual image dimensions
    const imgWidth  = 1024;
    const imgHeight = 768;

    function mapWorldToPixel({ x, y }) {
        // normalize X from [minX…maxX] → [0…1]
        const normX = (x - worldBounds.minX) 
                    / (worldBounds.maxX - worldBounds.minX);

        // normalize Y…but remember in pixels Y=0 is _top_ so we invert:
        const normY = 1 - ( (y - worldBounds.minY)
                        / (worldBounds.maxY - worldBounds.minY) );

        // convert to pixel coords
        return {
            px: normX * imgWidth,
            py: normY * imgHeight
        };
    }


    if (isLoading) {
        return <img src={Loadingrevolver} alt="loading..."  style={{ width: '10%', height: '10%' }}  />
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <Grid2 container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: 10 }}>
            {data.map((item) => (
                <Grid2 item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <Card sx={{ width: 300, height: 350 }}> {/* Set the desired width and height */}
                        <CardMedia
                            component="img"
                            height="140"
                            image={item.image}
                            alt={item.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.common_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Property ID: {item.id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Location: {(() => {
                                    const coords = parseLocationData(item.location);
                                    return `X: ${coords.x.toFixed(2)}, Y: ${coords.y.toFixed(2)}`;
                                })()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price: ${item.price}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="small" 
                            onClick={() => handleButtonClick(item.id, item.taxledger, item.common_name, item.price, item.image, item.location)} 
                            sx={{
                                backgroundColor: '#1976d2', // Primary color
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#115293', // Darker shade for hover state
                                },
                                borderRadius: '8px', // Rounded corners
                                padding: '8px 16px', // Padding
                                fontSize: '14px', // Font size
                            }}
                            >
                                View Property</Button>
                        </CardActions>
                    </Card>
                </Grid2>
            ))}
            <RealEstateModal
                open={isModalOpen}
                onClose={handleCloseModal}
                business={selectedProperty}
                isBusiness={false}
            /> 
        </Grid2>
    );
}

export default BuisnessGrid;