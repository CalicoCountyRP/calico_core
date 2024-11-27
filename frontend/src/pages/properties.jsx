import React from 'react';
import SidebarNav from '../components/Sidebar';
import TopBar from '../components/topbar';

const Properties = () => {
    return (
        <div className="content">
            <div className="topNav">
                <TopBar />
            </div>
            <SidebarNav />
            <h1>Properties Component</h1>
            <p>This is the properties component.</p>
        </div>
    );
};

export default Properties;