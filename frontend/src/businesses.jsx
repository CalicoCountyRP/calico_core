import React from 'react';
import SidebarNav from './components/Sidebar';
import BuisnessGrid from './components/Buisnesses'; 
import './App.css';

const Businesses = () => {
    return (
        <div>
            <h1>Businesses</h1>
            <p>Welcome to the Businesses page!</p>
            <BuisnessGrid />
            <SidebarNav />
        </div>
    );
};

export default Businesses;