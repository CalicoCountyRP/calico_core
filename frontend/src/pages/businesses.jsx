import React from 'react';
import SidebarNav from '../components/Sidebar';
import BuisnessGrid from '../components/Buisnesses'; 
import '../App.css';
import TopBar from '../components/topbar';
import { useLocation } from 'react-router-dom';

const Businesses = () => {
    const location = useLocation();
    const info = location.state;

    return (
        <div className="businessgrid">
            <div className="topNav">
                <TopBar />
            </div>
            <div className="sidebar-container">
                <SidebarNav />
            </div>
            <div className='test'>
                <h1>Real Estate Office: Businesses</h1>
                <div clasName="buisness-grid-contaner">
                    <BuisnessGrid />
                </div>
            </div>
        </div>
    );
};

export default Businesses;