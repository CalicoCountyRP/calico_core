import React, { useEffect, useState } from 'react';
import { Grid2, Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';


const OwnedProperties = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/ownedproperties`);
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

    const handleButtonClick = (id) => {
        // Define what happens when the button is clicked (e.g., log the ID)
        console.log(`Button clicked for character with ID: ${id}`);
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }


    return (
        <Grid2 container spacing={2}>
            {data.map((item) => (
                <Grid2 item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <Card sx={{ width: 300, height: 400 }}> {/* Set the desired width and height */}
                        <CardMedia
                            component="img"
                            height="140"
                            image={item.imageUrl}
                            alt={item.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleButtonClick(item.id)}>Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );
};

export default OwnedProperties;