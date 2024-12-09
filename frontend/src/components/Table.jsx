import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'ip', headerName: 'IP', width: 150 },
    { field: 'steamId', headerName: 'SteamID', flex: 1, minWidth: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
];

export default function Table({ steamID, ip }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        // Create the rows array based on the steamID and ip props
        const newRows = [
            { id: 1, ip: ip, steamId: steamID, date: new Date().toISOString().split('T')[0] },
            // Add more rows as needed
        ];
        setRows(newRows);
    }, [steamID, ip]);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
    );
}