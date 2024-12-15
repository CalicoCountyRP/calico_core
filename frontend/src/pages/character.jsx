import React from 'react';
import CharacterGrid from '../components/Skills';
import SidebarNav from '../components/Sidebar';
import TopBar from '../components/topbar';
import '../App.css';
import OwnedProperties from '../components/OwnedProperties';

const Character = () => {
    return (
        <div className="content">
            <div className="topNav">
                <TopBar />
            </div>
            <div className="sidebar-container">
                <SidebarNav />
            </div>
            <div className='test'>
                <h1 style={{ textAlign: 'center', color: 'white', fontSize: '60px', marginBottom: '0px' }}>Characters</h1>
                <p style={{ textAlign: 'center', color: 'white', fontSize: '20px', marginTop: '0px' }}>An overview of all your characters</p>
                <CharacterGrid />
                <br />
                {/* <OwnedProperties /> */}
            </div>
        </div>
    );
};

export default Character;