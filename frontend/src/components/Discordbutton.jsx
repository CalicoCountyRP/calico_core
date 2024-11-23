import React from 'react';


function DiscordButton() {
    return (
    <div>
        <a id="login" href="http://localhost:8081/auth/discord/login" class="bg-discord-blue  text-xl px-5 py-3 rounded-md font-bold flex items-center space-x-4 hover:bg-gray-600 transition duration-75">
            <i class="fa-brands fa-discord text-2x1"></i>
            <span>Login With Discord</span>
        </a>
    </div>
    )
}

export default DiscordButton;