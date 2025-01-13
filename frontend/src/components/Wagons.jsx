import React, { useEffect, useState } from 'react';
import { Grid2, Card, CardContent, CardActions, Button, Typography, CardMedia } from '@mui/material';
import Loadingrevolver from '../assets/loading.gif';
import WagonTypeMap from '../typemaps/wagons';

function Wagons({ steamID }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [firstlast, setWagonOwner] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            if (!steamID) {
                console.error("SteamID not provided");
                return;
            }

            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/getVehicles/${steamID}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);

                const charid = result.map((item) => item.charid);

                const wagonOwner = await Promise.all(result.map(async (horse) => {
                    const nameResponse = await fetch(`${import.meta.env.VITE_REACT_API_URL}/name/${charid}`);
                    if (!nameResponse.ok) {
                        throw new Error("Failed to fetch name");
                    }
                    const nameResult = await nameResponse.json();

                    const owner = nameResult.map((item) => item.firstname + " " + item.lastname);
                    
                    setWagonOwner(owner);
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
        return <img src={Loadingrevolver} alt="loading..."  style={{ width: '10%', height: '10%' }}  />
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <Grid2 container spacing={2}>
            {data.map((item, index) => {
                const typeString = WagonTypeMap[item.model] || item.model; // Translate type string to user-friendly name

                return (
                    <Grid2 item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card sx={{ width: 300, height: 130 }}> {/* Set the desired width and height */}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary"> <b>Owned By:</b> {firstlast[index]} </Typography>
                                <Typography variant="body2" color="text.secondary"> <b>Type:</b> {typeString} </Typography>
                                <Typography variant="body2" color="text.secondary"> <b>Condition:</b> {item.condition}% </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                );
            })}
        </Grid2>
    );
}

export default Wagons;