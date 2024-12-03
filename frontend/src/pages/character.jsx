import React from 'react';
import SkillsCardGrid from '../components/Skills';
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
                <h1>Characters</h1>
                <SkillsCardGrid />
                <br />
                {/* <OwnedProperties /> */}
            </div>
        </div>
    );
};

export default Character;