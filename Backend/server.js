const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config()
const cookieParser = require('cookie-parser');

const app = express()
app.use(cors({
    origin: process.env.urlbase,
    credentials: true
}));
app.use(cookieParser())

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

app.get('/', (req, res)=> {
    res.redirect('https://core.calicocountyrp.com');
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

        const user = { username: userData.username, id: userData.id, global: userData.global_name }; // Replace with actual user info
        const redirectURL = process.env.clientredirect

        res.cookie('auth', JSON.stringify(user), { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.redirect(`${redirectURL}/pages/dashboard?user=${encodeURIComponent(JSON.stringify(user))}`);

    } catch (error) {
        console.error('Error Processing Discord Callback:', error.response?.data || error.message);
        res.send(500).send('Error during Discord authenticiation');
    }
})

app.get('/auth/check', (req, res) => {
    const user = req.cookies.auth;
    if (user) {
        res.json({ authenticated: true });
    } else {
        res.status(401).json({ authenticated: false });
    }
})

app.get('/logout', async (req, res) => {
    res.clearCookie('auth');
    res.redirect(process.env.urlbase);
})

app.get('/getIdentifiers/:id', async (req, res) => {
    const { id } = req.params
    if (!id) {
        console.log("Id is missing")
    }
    const identifierquery = `SELECT identifier, discord_id, ip, steam_name, steamid, fivemid from player_info WHERE discord_id = ?`;
    db.query(identifierquery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })

})

app.get('/char/:id', async (req, charres) => {
    const { id } = req.params
    if (!id) {
        console.log("Id is missing")
    }
    const charsql = `select identifier, charidentifier, firstname, lastname, job, discordid, money, age, character_desc, nickname, gender, hours, LastLogin, pfp from characters WHERE discordid = ?`;
    db.query(charsql, [id], (err, data) => {
        if(err) return charres.json(err);
        return charres.json(data);
    })
})

app.get('/name/:id', async (req, nameres) => {
    const { id } = req.params
    if (!id) {
        console.log("Id is missing")
    }
    const namesql = `select firstname, lastname from characters WHERE charidentifier = ?`;
    db.query(namesql, [id], (err, data) => {
        if(err) return nameres.json(err);
        return nameres.json(data);
    })
})

app.get('/getlogins/:id', async (req, res) => {
    const { id } = req.params
    if (!id) {
        console.log("Id is missing")
    }
    const steamquery = `SELECT * from player_info WHERE discord_id = ? ORDER BY date desc LIMIT 5`;
    db.query(steamquery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/getsteam/:id', async (req, res) => {
    const { id } = req.params
    if (!id) {
        console.log("Id is missing")
    }
    const steamquery = `SELECT identifier FROM characters WHERE discordid = '243174457336791041' LIMIT 1`;
    db.query(steamquery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/getHorses/:id', async (req, res) => {
    const {id} = req.params
    if (!id) {
        console.log("Id is missing")
    }
    const horsequery = `SELECT charid, name, gender, model, born from player_horses WHERE  dead = 0 AND identifier = ?`;
    db.query(horsequery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/getVehicles/:id', async (req, res) => {
    const {id} = req.params
    if (!id) {
        console.log("Id is missing")
    }
    const horsequery = `SELECT * from player_wagons WHERE identifier = ?`;
    db.query(horsequery, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/properties', async (req, res) => {
    const propertiessql = "select id, common_name, price, location, image, taxledger, buyeridentifier from playerhousing WHERE owned = 0";
    db.query(propertiessql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/ownedproperties', async(req, res) => {
    const { steamID } = req.params
    if (!steamID) {
        console.log("Steam Id is missing")
    }
    const ownedpropertysql = 'select id, common_name, taxledger, from playerhousing WHERE buyeridentifier = ? AND owned = 1';
    db.query(ownedpropertysql, [steamID], (err, data) => {
        if(err) return ownedpropertysql.json(err);
        return res.json(data);
    })
})

app.get('/getBuisnesses', async(req, res) => {
    const shopssql = 'select name, id, image, price, location, disc, type from society_shops WHERE forsale = 1';
    db.query(shopssql, (err, data) => {
        if(err) return shopssql.json(err);
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
