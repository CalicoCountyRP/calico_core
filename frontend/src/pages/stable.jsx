import React, { useEffect, useState } from 'react';
import SidebarNav from '../components/Sidebar';
import TopBar from '../components/topbar';
import Horses from '../components/Horses';

const Stable = () => {
    const [steamID, setSteamID] = useState("");

    useEffect(() => {
        const storedSteamID = localStorage.getItem('steamID');
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
            <h1>Welcome to the Stable Component</h1>
            <p>This is a placeholder for the stable component content.</p>  
            <p>{steamID}</p>
            <Horses steamID={steamID}/>
        </div>
    );
};

export default Stable;