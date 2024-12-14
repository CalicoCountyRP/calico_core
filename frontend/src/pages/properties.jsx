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
            <h1 style={{ textAlign: 'center', color: 'white', fontSize: '60px', marginBottom: '0px' }}>Properties</h1>
            <p style={{ textAlign: 'center', color: 'white', fontSize: '20px', marginTop: '0px' }}>Real Estate Office</p>

            <PropertyGrid />
        </div>
    );
};

export default Properties;