const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

app.get('/', (req, res)=> {
    return res.json("From Backend");
})

app.get('/auth/discord/login', (req, res) => {
    const url = process.env.discordlink
    res.redirect(url)
})

app.get('/auth/discord/callback', async (req, res) => {
    try {
        // Extract query parameters from the request URL
        const { access_token: accessToken, token_type: tokenType } = req.query;

        if (!accessToken || !tokenType) {
            return res.status(400).send("Access token or token type is missing");
        }

        // Use the access token to fetch user information
        const userResponse = await fetch('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                Authorization: `${tokenType} ${accessToken}`
            }
        });

        if (!userResponse.ok) {
            const errorText = await userResponse.text();
            console.error("Failed to fetch user data from Discord:", errorText);
            return res.status(userResponse.status).send("Failed to fetch user data from Discord");
        }

        const { id, username, avatar } = await userResponse.json();

        // Example log or further processing
        console.log(`User Info: ${id}, ${username}, ${avatar}`);

        // Redirect to the client redirect URL
        res.redirect(process.env.clientredirect);
    } catch (error) {
        console.error('Error during Discord OAuth callback:', error);
        res.status(500).send("An error occurred during the authentication process.");
    }
});



app.get('/char', (req, charres) => {
    const charsql = "select charidentifier, firstname, lastname, job, discordid, money, age, character_desc, nickname, gender, hours from characters WHERE discordid = '243174457336791041'";
    db.query(charsql, (err, data)=> {
        if(err) return charres.json(err);
        return charres.json(data);
    })
})

app.get('/properties', (req, res) => {
    const propertiessql = "select * from playerhousing";
    db.query(propertiessql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/forsale', (req, res) => {
    const forsalesql = "select id, tax, price from playerhousing WHERE owned = 0";
    db.query(forsalesql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data)
    })
})

const port = process.env.PORT || 8081

app.listen(8081, ()=> {
    console.log(`Server listening at ${port}`);
})