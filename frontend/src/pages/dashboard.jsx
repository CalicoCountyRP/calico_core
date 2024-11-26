import React, { useEffect, useState } from 'react';
import DropdownMenu from '../components/Dropdown';
import SidebarNav from '../components/Sidebar'
import SkillsCardGrid from '../components/Skills';
import AccountInfo from '../components/AcountInfo';
import BuisnessGrid from '../components/Buisnesses';
import '../App.css'

function Dashboard() {
  const [discordUsername, setdiscordUsername] = useState("");
  const [discordID, setDiscordID] = useState("");
  const [discordGlobalName, setDiscordGlobalName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user') ? JSON.parse(params.get('user')) : null;

    if (user) {
      console.log('Logged in user:', user.username, user.id, user);
      setdiscordUsername(user.username)
      setDiscordID(user.id)
      setDiscordGlobalName(user.global)
      localStorage.setItem('discordID', user.id)
    }
  }, []);

  return(
    <div className="content">
      <SidebarNav />
      <div className="test">
        <h1>Dashboard</h1>
        <p>Welcome Back, {discordGlobalName}!</p>
        <br />
        <h1><u>Account Info</u></h1>
        <AccountInfo />
      </div>
    </div>
  )
};

export default Dashboard;