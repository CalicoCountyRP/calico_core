import React from 'react';
import { Grid2, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const cards = [
  {
    id: 1,
    title: 'Identifiers',
    description: 'This is the description for card 1.',
  },
];


const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

function SkillsCardGrid({ discordID }) {
    return (
        <div>
            <div>
                <Grid2 container spacing={4} padding={2}>
                    {cards.map((card) => (
                    <Grid2 item xs={12} sm={6} md={4} lg={3} key={card.id}>
                        <Card>
                        <CardContent>
                            <Typography variant="h5" component="div"> {card.title} </Typography>
                            <Typography variant="body2" color="text.secondary"> Discord: {card.description} </Typography>
                            <Typography variant="body2" color="text.secondary"> Steam: {card.description} </Typography>
                        </CardContent>
                        </Card>
                    </Grid2>
                    ))}
                </Grid2>
            </div>

            <div>
                <h2>Kicks</h2>
                <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                />
                </Box>
            </div>

            <div>
                <h2>Bans</h2>
                <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                />
                </Box>
            </div>
        </div>

    );
};

export default SkillsCardGrid;
