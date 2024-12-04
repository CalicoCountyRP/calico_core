import React from 'react';
import logo from '../assets/cclogo.png';
import DropdownMenu from '../components/Dropdown';
import DiscordButton from '../components/Discordbutton';
import '../App.css'; // Make sure to import the CSS file

const Home = () => {
    return( 
        <div className="home-container">
            <div className="login">
                <br />
                <img src={logo} width={250} height={250} alt="Logo" />
                <h1>Calico County Core</h1>
                <br />
                <br />
                <DiscordButton />
            </div>
        </div>
    )
};

export default Home;