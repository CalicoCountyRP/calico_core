import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import TopBar from '../components/topbar';
import SidebarNav from '../components/Sidebar';
import '../App.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProperties: 0,
        totalBusiness: 0,
        activeUsers: 0
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Column definitions for the data grid
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'steamId', headerName: 'Steam ID', width: 130 },
        { field: 'group', headerName: 'Group', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleEdit(params.row.id)}
                        sx={{ mr: 1 }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        // Fetch statistics and user data
        const fetchData = async () => {
            try {
                setLoading(true);
                // Add your API calls here
                // const response = await fetch('your-api-endpoint');
                // const data = await response.json();
                
                // Temporary mock data
                setStats({
                    totalUsers: 150,
                    totalProperties: 45,
                    totalBusiness: 23,
                    activeUsers: 87
                });

                setUsers([
                    { id: 1, username: 'JohnDoe', steamId: 'STEAM_123', group: 'admin' },
                    { id: 2, username: 'JaneSmith', steamId: 'STEAM_456', group: 'user' },
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        console.log('Edit user:', id);
        // Add edit logic
    };

    const handleDelete = (id) => {
        console.log('Delete user:', id);
        // Add delete logic
    };

    return (
        <div className="businessgrid">
            <div className="topNav">
                <TopBar />
            </div>
            <div className="sidebar-container">
                <SidebarNav />
            </div>
            <div className='test'>
                <h1 style={{ textAlign: 'center', color: 'white', fontSize: '50px', marginBottom: '0px' }}>Admin Dashboard</h1>
                <p style={{ textAlign: 'center', color: 'white', fontSize: '20px', marginTop: '0px' }}>System Management</p>
                
                <div style={{ padding: '20px' }}>
                    {/* Statistics Cards */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Total Users
                                    </Typography>
                                    <Typography variant="h4">{stats.totalUsers}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Properties
                                    </Typography>
                                    <Typography variant="h4">{stats.totalProperties}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Businesses
                                    </Typography>
                                    <Typography variant="h4">{stats.totalBusiness}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Active Users
                                    </Typography>
                                    <Typography variant="h4">{stats.activeUsers}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Users Table */}
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                User Management
                            </Typography>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={users}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    loading={loading}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;