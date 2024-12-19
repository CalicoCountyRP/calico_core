import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function AccountInfo({ steamID, username, fivemID, ip, identifier, discordid }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="h2" style={{ color: 'white', marginBottom: '10px'}}>
                Identifiers
            </Typography>
            <Grid container spacing={4} padding={2} style={{ display: 'flex', justifyContent: 'center', marginTop: '0px'}}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary"> Discord User: {username} </Typography>
                            <Typography variant="body2" color="text.secondary"> Discord ID: {discordid} </Typography>
                            <Typography variant="body2" color="text.secondary"> Steam64: {steamID} </Typography>
                            <Typography variant="body2" color="text.secondary"> FiveM ID: {fivemID} </Typography>
                            <Typography variant="body2" color="text.secondary"> Last IP: {ip} </Typography>
                            <Typography variant="body2" color="text.secondary"> Identifier: {identifier} </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default AccountInfo;
