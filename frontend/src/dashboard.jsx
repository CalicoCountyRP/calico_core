import React, { useEffect, useState } from 'react';
import DropdownMenu from './components/Dropdown';

function Dashboard() {
  const [discordUsername, setdiscordUsername] = useState("");
  const [discordID, setDiscordID] = useState("");
  const [discordGlobalName, setDiscordGlobalName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user') ? JSON.parse(params.get('user')) : null;

    if (user) {
      const {username, id} = user;
      console.log('Logged in user:', user.username, user.id);
      setdiscordUsername(user.username)
      setDiscordID(user.id)
      setDiscordGlobalName(user.global)
    }
  }, []);

  return(
    <div>
      <h1>Dashboard</h1><p>Welcome Back, {discordGlobalName}!</p>
      <br />
      <DropdownMenu discordID={ discordID } />
    </div>
  )
};

export default Dashboard;