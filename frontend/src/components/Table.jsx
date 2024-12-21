import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';


const columns = [
    { field: 'ip', headerName: 'IP', width: 150 },
    { field: 'steamId', headerName: 'SteamID', flex: 1, minWidth: 200, maxWidth: 300 },
    { field: 'date', headerName: 'Date', width: 150 },
];

export default function Table({ discordID }) {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(`${import.meta.env.VITE_REACT_API_URL}/getlogins/${discordID}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();

                // Map the result to the format expected by the DataGrid
                const newRows = result.map((item, index) => ({
                    id: index + 1, // Ensure each row has a unique id
                    ip: item.ip,
                    steamId: item.steamid,
                    date: item.date,
                }));

                setRows(newRows);

            } catch (err) {
                setError(err.message);
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [discordID]);


    return (
        <div style={{ height: 400, width: 550 }}>
            <Typography variant="h5" component="h2" style={{ color: 'white', marginBottom: '10px' }}>
                Last 5 Logins
            </Typography>
            <DataGrid 
                rows={rows} 
                columns={columns}
                hideFooterPagination
                hideFooter
                sx={{
                    '& .MuiDataGrid-cell': {
                        color: 'white', // Set text color to white
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        color: 'black', // Set header text color to black
                    },
                }}
            />
        </div>
    );
}