import React from 'react';


function Characterinfo() {
    return (
    <div>
        <a id="login" href="https://discord.com/oauth2/authorize?client_id=1309222716766949386&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fauth%2Fdiscord&scope=identify" class="bg-discord-blue  text-xl px-5 py-3 rounded-md font-bold flex items-center space-x-4 hover:bg-gray-600 transition duration-75">
            <i class="fa-brands fa-discord text-2x1"></i>
            <span>Login With Discord</span>
        </a>
    </div>
    )
}

export default Characterinfo;