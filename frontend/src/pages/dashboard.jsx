import React, { useEffect, useState } from 'react';
import SidebarNav from '../components/Sidebar'
import AccountInfo from '../components/AcountInfo';
import TopBar from '../components/topbar';
import DashboardButtons from '../components/dashboardbuttons';
import '../App.css'
import BasicTable from '../components/Table';

function Dashboard() {
  const [discordUsername, setdiscordUsername] = useState("");
  const [discordID, setDiscordID] = useState("");
  const [discordGlobalName, setDiscordGlobalName] = useState("");
  const [steamID, setSteamID] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [userIP, setUserIP] = useState('');
  const [fivemID, setFivemID] = useState('');
  const [identifier, setIdentifier] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user') ? JSON.parse(params.get('user')) : null;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        console.log(user.id)
        const response = await fetch(`http://localhost:8081/getIdentifiers/${user.id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch identifiers");
        }
        const result = await response.json();

        setData(result);

        const identifiers = result.map((identifier) => ({
          discord_id: identifier.discord_id,
          identifier: identifier.identifier,
          ip: identifier.ip,
          steam_name: identifier.steam_name,
          steamid: identifier.steamid,
          fivemid: identifier.fivemid,
      }));

        if (!identifiers.length) {
          console.log("No identifiers found")
          return;
        }

        const filteredIdentifiers = identifiers[0];

        setdiscordUsername(user.username)
        setDiscordID(filteredIdentifiers.discord_id)
        setDiscordGlobalName(user.global)
        setSteamID(filteredIdentifiers.steamid)
        setUserIP(filteredIdentifiers.ip)
        setFivemID(filteredIdentifiers.fivemid)
        setIdentifier(filteredIdentifiers.identifier)
        localStorage.setItem('discordID', filteredIdentifiers.discord_id)
        localStorage.setItem('steam64', filteredIdentifiers.steamid)

      } catch (err) {
          setError(err.message);
          console.error("Error fetching data:", err);
      } finally {
          setIsLoading(false);
          
      }
    };

  if (user) {
    console.log('Logged in user:', user.username, user.id, user);
    fetchData();
  }

  }, []);


  return(
    <div className="dashboard">
      <div className="topNav">
        <TopBar />
      </div>
      <SidebarNav />
      <div className="dashboard-test">
        <h1>Welcome Back, {discordGlobalName}!</h1>
        <br />
        <DashboardButtons />
        <AccountInfo steamID={steamID} username={ discordGlobalName } fivemID={ fivemID } ip={ userIP } identifier={ identifier } discordid={ discordID } />
        <BasicTable steamID={steamID} ip={ userIP} />
      </div>
    </div>
  )
};

export default Dashboard;