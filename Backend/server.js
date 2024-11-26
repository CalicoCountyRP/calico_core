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
    const code = req.query.code;

    if (!code) {
        return res.status(400).send('Authorization code missing');
    }

    try {
        const tokenResponseData = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.disocrdClientID,
                client_secret: process.env.discordClientSecret,
                code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.redirectURI,
                scope: 'identify',
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const oauthData = await tokenResponseData.json();
        const access_token = oauthData.access_token;

        if (!access_token) {
            console.error('Access Token not received from discord')
        }

        const userResponse = await fetch('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${access_token}`,
            },
        })

        if (!userResponse.ok) {
            const errorData = await userResponse.json();
            console.error(`Failed to fetch user info: ${errorData.message}`);
        }

        const userData = await userResponse.json();
        const user = { username: userData.username, id: userData.id }; // Replace with actual user info
        const redirectURL = process.env.clientredirect

        res.redirect(`${redirectURL}/dashboard?user=${encodeURIComponent(JSON.stringify(user))}`);

    } catch (error) {
        console.error('Error Processing Discord Callback:', error.response?.data || error.message);
        res.send(500).send('Error during Discord authenticiation');
    }
})

app.get('/char/:id', async (req, charres) => {
    const { id } = req.params;
    console.log(`id: ${id}`)
    if (!id) {
        console.log("Id is missing")
    }
    const charsql = `select charidentifier, firstname, lastname, job, discordid, money, age, character_desc, nickname, gender, hours from characters WHERE discordid = ?`;
    db.query(charsql, [id], (err, data) => {
        if(err) return charres.json(err);
        return charres.json(data);
    })
})

app.get('/properties', async (req, res) => {
    const propertiessql = "select id, taxledger, buyeridentifier from playerhousing";
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