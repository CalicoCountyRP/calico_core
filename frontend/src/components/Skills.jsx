import React, { useEffect, useState } from 'react';
import { Grid2, Card, CardContent, Typography, CardMedia } from '@mui/material';
import userPlaceholder from '../assets/userPlaceholder.png';

function CharacterGrid() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const discordID = localStorage.getItem('discordID');

    useEffect(() => {
        const fetchData = async () => {
            try {
              if (!discordID) {
                  console.log("Error, no discord ID provided")
                  return;
              }
              setIsLoading(true);
              console.log(`Fetching data for discordID: ${discordID}`)
              const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/char/${discordID}`);
              if (!response.ok) {
                throw new Error("Failed to fetch data");
              }
              const result = await response.json();
              
              const flattenedData = result.flat();
              setData(flattenedData);

            } catch (err) {
              setError(err.message);
              console.error("Error fetching data:", err);
            } finally {
              setIsLoading(false);
            }
          };
            fetchData();
    }, [discordID]);
    
    if (isLoading) {
        return <Typography>Loading...</Typography>
    }

    if (error) {
        return <Typography>Error: {error}</Typography>
    }

    return (
        <Grid2 container spacing={4} padding={2} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
          {data.map((card) => (
            <Grid2 item xs={12} sm={6} md={4} lg={3} key={card.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image={card.pfp || userPlaceholder} // Assuming each card object has an 'image' property
                  alt={`${card.firstname} ${card.lastname}`}
                />
                <CardContent>
                  <Typography variant="h5" component="div">{card.firstname} {card.lastname}</Typography>
                  <br />
                  <Typography variant="body2" color="text.secondary"><b>Database Identifier:</b> {card.charidentifier} </Typography>
                  <Typography variant="body2" color="text.secondary"><b>Last Login:</b> {card.LastLogin}</Typography>
                  <Typography variant="body2" color="text.secondary"><b>Money on Hand:</b> {card.money} </Typography>
                  <Typography variant="body2" color="text.secondary"><b>Job:</b> {card.job} </Typography>
                  <Typography variant="body2" color="text.secondary"><b>Time Played:</b> {card.hours} hrs</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
    )
}

export default CharacterGrid;