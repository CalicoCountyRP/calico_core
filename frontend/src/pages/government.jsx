import React from 'react';
import SidebarNav from '../components/Sidebar';
import '../App.css';

const Government = () => {
    return (
        <div className="content">
            <SidebarNav />
            <div className='test'>
                <h1>Government Component</h1>
                <p>This is the Government component.</p>
            </div>
        </div>
    );
};

export default Government;