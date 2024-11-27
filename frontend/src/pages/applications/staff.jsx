import React from 'react';
import TopBar from '../../components/topbar';
import SidebarNav from '../../components/Sidebar';

const StaffApp = () => {
    return (
        <div className="content">
            <div className="topNav">
                <TopBar />
            </div>
            <SidebarNav />
            <h1>Staff App</h1>
            <p>Welcome to the staff app!</p>
        </div>
    );
};

export default StaffApp;