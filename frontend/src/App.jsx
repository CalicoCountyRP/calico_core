import React, { useEffect, useState } from 'react';
import DropdownMenu from './components/Dropdown';
import DiscordButton from './components/Discordbutton';

function App() {
/*   const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8081/char')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, []) */

  return (
    <div style = {{padding: "50px"}}>
 {/*      <table>
        <thead>
          <tr>
            <th>charid</th>
            <th>firstname</th>
            <th>lastname</th>
            <th>Nickname</th>
            <th>job</th>
            <th>money</th>
            <th>age</th>
            <th>gender</th>
            <th>hours</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.firstname}</td>
              <td>{d.lastname}</td>
              <td>{d.nickname}</td>
              <td>{d.job}</td>
              <td>{d.money}</td>
              <td>{d.age}</td>
              <td>{d.gender}</td>
              <td>{d.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      <br />

      <br />
      <br /> */}

      <DiscordButton></DiscordButton>
        <br />
        <br />
      <DropdownMenu></DropdownMenu>
    </div>
  )
}

export default App