import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8081/char')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])

  return (
    <div style = {{padding: "50px"}}>
      <table>
        <thread>
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
        </thread>
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

      <div>
        <a id="login" href="https://discord.com/oauth2/authorize?client_id=1309222716766949386&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A53134%2Fauth%2Fdiscord&scope=identify" class="bg-discord-blue  text-xl px-5 py-3 rounded-md font-bold flex items-center space-x-4 hover:bg-gray-600 transition duration-75">
          <i class="fa-brands fa-discord text-2x1"></i>
          <span>Login With Discord</span>
        </a>
      </div>
    </div>
  )
}

export default App