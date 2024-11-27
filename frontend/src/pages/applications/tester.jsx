import React from 'react';
import TopBar from '../../components/topbar';
import SidebarNav from '../../components/Sidebar';

const TesterApp = () => {
    return (
        <div className="content">
            <div className="topNav">
                <TopBar />
            </div>
            <SidebarNav />
            <h1>Tester App</h1>
            <p>Welcome to the Tester App!</p>
        </div>
    );
};

export default TesterApp;