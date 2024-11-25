import React from 'react';
import DropdownMenu from './components/Dropdown';
import DiscordButton from './components/Discordbutton';

const Home = () => {
    return( 
        <div style = {{padding: "50px"}}>
            <h1>Calico County Core</h1>
            <DiscordButton />
            <br />
            <br />
            <DropdownMenu />
        </div>
    )
};

export default Home;