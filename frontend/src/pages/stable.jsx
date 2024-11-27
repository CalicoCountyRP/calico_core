import React from 'react';
import SidebarNav from '../components/Sidebar';
import TopBar from '../components/topbar';

const Stable = () => {
    return (
        <div className="content">
            <div className="topNav">
                <TopBar />
            </div>
            <SidebarNav />
            <h1>Welcome to the Stable Component</h1>
            <p>This is a placeholder for the stable component content.</p>  
        </div>
    );
};

export default Stable;