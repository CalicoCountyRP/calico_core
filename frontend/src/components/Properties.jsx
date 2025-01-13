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

    const handleButtonClick = (id, taxledger, common_name, price, location) => {
        const info = {
            id:id,
            name:common_name,
            price:price,
            location:location,
            taxledger:taxledger
        }

        setSelectedProperty(info);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProperty(null);
    };


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
                            image={item.imageUrl}
                            alt={item.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div"> {item.common_name} </Typography>
                            <Typography variant="body2" color="text.secondary">Property ID: {item.id} </Typography>
                            <Typography variant="body2" color="text.secondary">Location: {item.location} </Typography>
                            <Typography variant="body2" color="text.secondary">Price: ${item.price} </Typography>
                            {/* <Typography variant="body2" color="text.secondary"> {item.taxledger} </Typography> */}
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="small" 
                            onClick={() => handleButtonClick(item.id, item.taxledger, item.common_name, item.price, item.location)} 
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