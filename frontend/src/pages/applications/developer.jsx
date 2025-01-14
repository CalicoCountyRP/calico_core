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
            <div className='test'>
                <h1 style={{ textAlign: 'center', color: 'white', fontSize: '60px', marginBottom: '0px' }}>Developer Application</h1>
                <p style={{ textAlign: 'center', color: 'white', fontSize: '20px', marginTop: '0px' }}>Help out the team here at Calico County</p>
                <ProgressBar />
            </div>
        </div>
    );
};

export default DeveloperApp;