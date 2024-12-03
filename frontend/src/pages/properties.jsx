import React from 'react';
import SidebarNav from '../components/Sidebar';
import TopBar from '../components/topbar';
import PropertyGrid from '../components/Properties';

const Properties = () => {
    return (
        <div className="content">
            <div className="topNav">
                <TopBar />
            </div>
            <SidebarNav />
            <h1>Properties</h1>
            <PropertyGrid />
        </div>
    );
};

export default Properties;