import React from 'react';
import { Grid2, Card, CardContent, Typography, CardMedia } from '@mui/material';

const discordID = localStorage.getItem('discordID');


function AccountInfo({ steamID, username }) {
    return (
      <div>
          <div>
              <Grid2 container spacing={4} padding={2}>
                  <Grid2 item xs={12} sm={6} md={4} lg={3}>
                      <Card>
                        <CardContent>
                            <Typography variant="h5" component="div"> Identifiers </Typography>
                            <Typography variant="body2" color="text.secondary"> Discord User: { username }  </Typography>
                            <Typography variant="body2" color="text.secondary"> Discord ID: { discordID } </Typography>
                            <Typography variant="body2" color="text.secondary"> Steam64: { steamID } </Typography>
                        </CardContent>
                      </Card>
                  </Grid2>
              </Grid2>
          </div>
      </div>
    );
};

export default AccountInfo;
