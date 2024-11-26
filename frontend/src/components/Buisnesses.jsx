import React, { useEffect, useState } from 'react';
import { Grid2, Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';

function BuisnessGrid() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
              setIsLoading(true);

              const response = await fetch(`http://localhost:8081/getBuisnesses`);
              if (!response.ok) {
                throw new Error("Failed to fetch data");
              }
              const result = await response.json();
              
              const flattenedData = result.flat();
              setData(flattenedData);

              console.log(flattenedData)

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
        return <Typography>Loading...</Typography>
    }

    if (error) {
        return <Typography>Error: {error}</Typography>
    }

    console.log(data)
    return (
        <Grid2 container spacing={4} padding={2}>
          {data.map((card) => (
            <Grid2 item xs={12} sm={6} md={4} lg={3} key={card.id}>
              <Card>
                <CardMedia
                    component="img"
                    height="160"
                    image="https://imagedelivery.net/Hgl-UO4Kg_kPptcXUHVOrA/53749d25-7784-45c9-b707-9ac3e16f3a00/large"
                    alt={card.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">{card.name}</Typography>
                  <br />
                  <Typography variant="body2" color="text.secondary"><b>Property: {card.id}</b> </Typography>
                  <Typography variant="body2" color="text.secondary"><b>Location</b> </Typography>
                  <Typography variant="body2" color="text.secondary"><b>$$$$ Current Bid</b> </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" color="primary" onClick={() => handleButtonClick(card.name)}>View Business</Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
    )
}

export default BuisnessGrid;