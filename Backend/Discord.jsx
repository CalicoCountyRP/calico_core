import React, {useEffect} from 'react';


function Discord() {
    useEffect(() => {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

        if (!accessToken) {
            window.location.href('/')
        }

        fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType}` `${accessToken}`,
            },
        })
        .then(result => result.json())
        .then(response => {
            console.log(response);
            const { username, avatar, id } = response;
        })
    }, [])
    return (
        <div>
            console.log(response.username, response.avatar, response.id)
    </div>
    )
}

export default Discord;