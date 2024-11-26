import React from 'react';
import SkillsCardGrid from './components/Skills';
import SidebarNav from './components/Sidebar';

const Character = ({ name, description, image }) => {
    return (
        <div>
            <h1>Character</h1>
            <p>Welcome to the Character page!</p>
            <SkillsCardGrid />
            <SidebarNav />
        </div>
    );
};

export default Character;