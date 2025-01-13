import React, { useEffect, useState } from 'react';
import { Grid2, Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';
import Loadingrevolver from '../assets/loading.gif';
import BreedsTypeMap from '../typemaps/horsebreeds';

function Horses({ steamID }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [firstlast, setHorseOwner] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!steamID) {
                console.error("SteamID not provided");
                return;
            }

            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/getHorses/${steamID}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
                
                const charid = result.map((item) => item.charid);

                const horseOwner = await Promise.all(result.map(async (horse) => {
                    const nameResponse = await fetch(`${import.meta.env.VITE_REACT_API_URL}/name/${charid}`);
                    if (!nameResponse.ok) {
                        throw new Error("Failed to fetch name");
                    }
                    const nameResult = await nameResponse.json();

                    const owner = nameResult.map((item) => item.firstname + " " + item.lastname);
                    
                    setHorseOwner(owner);
                }));

            } catch (err) {
                setError(err.message);
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [steamID]);

    if (isLoading) {
        return <img src={Loadingrevolver} alt="loading..." style={{ width: '10%', height: '10%' }} />
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <Grid2 container spacing={2}>
            {data.map((item) => {
                const date = new Date(item.born);
                const formattedDate = date.toISOString().split('T')[0]; // Convert to yyyy-mm-dd format
                const typeString = BreedsTypeMap[item.model] || item.model;

                return (
                    <Grid2 item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card sx={{ width: 300, height: 155 }}> {/* Set the desired width and height */}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary"> <b>Owned By:</b> {firstlast} </Typography>
                                <Typography variant="body2" color="text.secondary"> <b>Gender:</b> {item.gender} </Typography>
                                <Typography variant="body2" color="text.secondary"> <b>Breed:</b> {typeString} </Typography>
                                <Typography variant="body2" color="text.secondary"> <b>DOB:</b> {formattedDate} </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                );
            })}
        </Grid2>
    );
}

export default Horses;