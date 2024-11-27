import React from 'react';
import SidebarNav from '../components/Sidebar';
import TopBar from '../components/topbar';
import '../App.css';

const Government = () => {
    return (
        <div className="content">
            <div className="topNav">
                <TopBar />
            </div>
            <SidebarNav />
            <div className='test'>
                <h1>Government Component</h1>
                <p>This is the Government component.</p>
            </div>
        </div>
    );
};

export default Government;