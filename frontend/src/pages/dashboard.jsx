import React, { useEffect, useState } from 'react';
import SidebarNav from '../components/Sidebar'
import AccountInfo from '../components/AcountInfo';
import TopBar from '../components/topbar';
import DashboardButtons from '../components/dashboardbuttons';
import '../App.css'

function Dashboard() {
  const [discordUsername, setdiscordUsername] = useState("");
  const [discordID, setDiscordID] = useState("");
  const [discordGlobalName, setDiscordGlobalName] = useState("");
  const [steamID, setSteamID] = useState("");
  const discordUsernameGlobal = localStorage.getItem('discordUsername')
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user') ? JSON.parse(params.get('user')) : null;

    const fetchData = async () => {
      try {
          setIsLoading(true);

          console.log(user.id)
          const response = await fetch(`http://localhost:8081/getsteam/${user.id}`);
          if (!response.ok) {
              throw new Error("Failed to fetch data");
          }
          const steamID = await response.json();

          console.log(steamID[0].identifier);
          localStorage.setItem('steamID', steamID[0].identifier)
          setSteamID(steamID[0].identifier)

      } catch (err) {
          setError(err.message);
          console.error("Error fetching data:", err);
      } finally {
          setIsLoading(false);
      }
  };

  if (user) {
    console.log('Logged in user:', user.username, user.id, user);
    setdiscordUsername(user.username)
    setDiscordID(user.id)
    setDiscordGlobalName(user.global)
    localStorage.setItem('discordID', user.id)
    localStorage.setItem('discordUsername', user.global)
    fetchData();
  }

  }, []);

  return(
    <div className="content">
      <div className="topNav">
        <TopBar />
      </div>
      <SidebarNav />
      <div className="test">
        <h1>Welcome Back, {discordUsernameGlobal}!</h1>
        <br />
        <DashboardButtons />
        <AccountInfo steamID={steamID} username={ discordUsernameGlobal } />
      </div>
    </div>
  )
};

export default Dashboard;