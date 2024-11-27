import React from 'react';
import SidebarNav from '../components/Sidebar';
import BuisnessGrid from '../components/Buisnesses'; 
import '../App.css';
import TopBar from '../components/topbar';

const Businesses = () => {
    return (
        <div className="content">
            <div className="topNav">
                <TopBar />
            </div>
            <div className="sidebar-container">
                <SidebarNav />
            </div>
            <div className='test'>
                <h1>Businesses</h1>
                <BuisnessGrid />
            </div>
        </div>
    );
};

export default Businesses;