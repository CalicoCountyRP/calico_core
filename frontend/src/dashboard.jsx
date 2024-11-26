import React, { useEffect, useState } from 'react';
import DropdownMenu from './components/Dropdown';

function Dashboard() {
  const [discordUsername, setdiscordUsername] = useState("");
  const [discordID, setDiscordID] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user') ? JSON.parse(params.get('user')) : null;

    if (user) {
      const {username, id} = user;
      console.log('Logged in user:', user.username, user.id);
      setdiscordUsername(user.username)
      setDiscordID(user.id)
    }
  }, []);

  return(
    <div>
      <h1>Welcome to the Dashboard {discordUsername}, {discordID}!</h1>
      <br />
      <DropdownMenu discordID={ discordID } />
    </div>
  )
};

export default Dashboard;