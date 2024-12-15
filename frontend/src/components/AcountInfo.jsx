import React from 'react';
import { Grid2, Card, CardContent, Typography, CardMedia } from '@mui/material';

function AccountInfo({steamID, username, fivemID, ip, identifier, discordid}) {
    return (
        <div>
            <Typography variant="h5" component="h2" style={{ color: 'white', marginBottom: '-5px', paddingLeft: '15px'}}> Identifiers </Typography>
            <Grid2 container spacing={4} padding={2}>
                <Card>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary"> Discord User: { username }  </Typography>
                        <Typography variant="body2" color="text.secondary"> Discord ID: { discordid } </Typography>
                        <Typography variant="body2" color="text.secondary"> Steam64: { steamID } </Typography>
                        <Typography variant="body2" color="text.secondary"> FiveM ID: { fivemID } </Typography>
                        <Typography variant="body2" color="text.secondary"> Last IP: { ip } </Typography>
                        <Typography variant="body2" color="text.secondary"> Identifier: { identifier } </Typography>
                    </CardContent>
                </Card>
            </Grid2>
        </div>
    );
};

export default AccountInfo;
