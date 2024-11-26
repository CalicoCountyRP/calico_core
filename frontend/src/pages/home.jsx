import React from 'react';
import logo from '../assets/react.svg';
import DropdownMenu from '../components/Dropdown';
import DiscordButton from '../components/Discordbutton';

const Home = () => {
    return( 
        <div style={{height: '150px', display: 'block', margin: '50px auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={logo} width={100} height={100} />
            <h1>Core</h1>
            <DiscordButton />
        </div>
    )
};

export default Home;