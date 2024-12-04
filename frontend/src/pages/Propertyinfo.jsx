import React from 'react';
import { Grid2, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useLocation } from 'react-router-dom';
import TopBar from '../components/topbar';
import SidebarNav from '../components/Sidebar';

const discordID = localStorage.getItem('discordID');


function PropertyInfo() {
    const location = useLocation();
    const { id} = location.state || {};

    return (
      <div className="content">
        <div className='topNav'>
            <TopBar />
        </div>
        <div className='sidebar-container'>
            <SidebarNav />
        </div>
          <div>
            <h1>Real Estate Office</h1>
              <Grid2 container spacing={4} padding={2}>
                  <Grid2 item xs={12} sm={6} md={4} lg={3}>
                      <Card>
                        <CardContent>
                            <Typography variant="h5" component="div"> For Sale: </Typography>
                            <Typography variant="body2" color="text.secondary"> {id}  </Typography>
                            <Typography variant="body2" color="text.secondary"> </Typography>
                            <Typography variant="body2" color="text.secondary"> </Typography>
                        </CardContent>
                      </Card>
                  </Grid2>
              </Grid2>
          </div>
      </div>
    );
};

export default PropertyInfo;
