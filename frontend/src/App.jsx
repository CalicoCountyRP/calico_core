import React, { useEffect, useState } from 'react';
import DropdownMenu from './components/Dropdown';
import DiscordButton from './components/Discordbutton';

function App() {
  return (
    <div style = {{padding: "50px"}}>
      <DiscordButton></DiscordButton>
        <br />
        <br />
      <DropdownMenu></DropdownMenu>
    </div>
  )
}

export default App