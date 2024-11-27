import React from 'react';
import TopBar from '../../components/topbar';
import SidebarNav from '../../components/Sidebar';

const DeveloperApp = () => {
    return (
        <div className="content">
            <div className="topNav">
                <TopBar />
            </div>
            <SidebarNav />
            <h1>Developer App</h1>
            <p>Welcome to the Developer App page!</p>
        </div>
    );
};

export default DeveloperApp;