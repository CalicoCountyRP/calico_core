import React, { useEffect, useState } from 'react';
import SidebarNav from '../components/Sidebar';
import TopBar from '../components/topbar';
import Horses from '../components/Horses';
import Wagons from '../components/Wagons';

const Stable = () => {
    const [steamID, setSteamID] = useState("");

    useEffect(() => {
        const storedSteamID = localStorage.getItem('steam64');
        if (!storedSteamID) {
            console.log('SteamID not found in local storage');
            return
        }
        setSteamID(storedSteamID)
    }, []);

    return (
        <div className="content">
            <div className="topNav">
                <TopBar />
            </div>
            <SidebarNav />
            <h1 style={{ textAlign: 'center', color: 'white', fontSize: '60px', marginBottom: '0px' }}>Stables</h1>
            <p style={{ textAlign: 'Left', color: 'white', fontSize: '30px', marginTop: '30px' }}>Horses</p>
            <Horses steamID={steamID}/>
            <p style={{ textAlign: 'Left', color: 'white', fontSize: '30px', marginTop: '30px' }}>Wagons</p>
            <Wagons steamID={steamID}/>
        </div>
    );
};

export default Stable;