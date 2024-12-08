import React from 'react';
import { Grid2, Card, CardContent, Typography, CardMedia } from '@mui/material';

function AccountInfo({steamID, username, fivemID, ip, identifier, discordid}) {
    return (
      <div>
          <div>
            <Grid2 container spacing={4} padding={2}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div"> Identifiers </Typography>
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
      </div>
    );
};

export default AccountInfo;
