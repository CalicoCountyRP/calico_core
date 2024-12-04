import React from 'react';
import { Grid2, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useLocation } from 'react-router-dom';
import TopBar from '../components/topbar';
import SidebarNav from '../components/Sidebar';

const discordID = localStorage.getItem('discordID');


function Buisnessinfo() {
    const location = useLocation();
    const { id, name, image } = location.state || {};

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
            <img src={image} alt={name} style={{ width: '500px', height: '300px'}} />
            <img src={image} alt={name} style={{ width: '500px', height: '300px'}} />
              <Grid2 container spacing={4} padding={2}>
                  <Grid2 item xs={12} sm={6} md={4} lg={3}>
                      <Card>
                        <CardContent>
                            <Typography variant="h5" component="div"> For Sale: {name} </Typography>
                            <Typography variant="body2" color="text.secondary"> {id}  </Typography>
                            <Typography variant="body2" color="text.secondary"> {name} </Typography>
                            <Typography variant="body2" color="text.secondary"> {image} </Typography>
                        </CardContent>
                      </Card>
                  </Grid2>
              </Grid2>
          </div>
      </div>
    );
};

export default Buisnessinfo;
