import React, { useEffect, useState } from 'react';
import { Grid2, Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RealEstateModal from './realestatemodal';

function BuisnessGrid( {businessData} ) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bizData, setBizData] = useState(businessData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/getBuisnesses`);
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
        setBizData(businessData);
    }, [businessData]);

    const handleButtonClick = (id, name, image) => {
        const info = {
            id:id,
            name:name,
            image:image
        }

        console.log(info)
 
        //navigate(`/buisnessinfo/${id}`, { state: info });
        setSelectedBusiness(info);
        setIsModalOpen(true);

        console.log(`Button clicked for character with ID: ${id}, ${name}, ${image}`);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBusiness(null);
    };


    return (
        <Grid2 container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
            {data.map((item) => (
                <Grid2 item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <Card sx={{ width: 300, height: 400 }}> {/* Set the desired width and height */}
                        <CardMedia
                            component="img"
                            height="140"
                            image={item.image}
                            alt={item.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Property ID: {item.id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Location: {item.location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price: ${item.price}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button
                                size="small"
                                onClick={() => handleButtonClick(item.id, item.name, item.image)}
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
                                View Business
                            </Button>
                        </CardActions>
                    </Card>
                </Grid2>
            ))}
            <RealEstateModal
                open={isModalOpen}
                onClose={handleCloseModal}
                business={selectedBusiness}
            /> 
        </Grid2>
    );
}

export default BuisnessGrid;