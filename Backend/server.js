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

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

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
        
        // Get all player identifiers using Discord ID
        const identifierQuery = `
            SELECT c.identifier, c.charidentifier, c.firstname, c.lastname,
                   pi.steam_name, pi.steamid, pi.ip
            FROM characters c
            LEFT JOIN player_info pi ON c.identifier = pi.identifier
            WHERE c.discordid = ?
            LIMIT 1`;

        db.query(identifierQuery, [userData.id], (err, identifierResults) => {
            if (err) {
                console.error('Identifier lookup error:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            const userIdentifiers = identifierResults[0] || {};
            
            // Create enhanced user object with all identifiers
            const user = {
                username: userData.username,
                id: userData.id,
                global: userData.global_name,
                steamId: userIdentifiers.steamid || null,
                steamIdentifier: userIdentifiers.identifier || null,
                steamName: userIdentifiers.steam_name || null,
                charId: userIdentifiers.charidentifier || null,
                firstName: userIdentifiers.firstname || null,
                lastName: userIdentifiers.lastname || null
            };

            const redirectURL = process.env.clientredirect;

            // Set enhanced cookie with all user data
            res.cookie('auth', JSON.stringify(user), { 
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict' 
            });

            res.redirect(`${redirectURL}/pages/dashboard?user=${encodeURIComponent(JSON.stringify(user))}`);
        });

    } catch (error) {
        console.error('Error Processing Discord Callback:', error);
        res.status(500).send('Error during Discord authentication');
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

app.get('/auth/role', async (req, res) => {
    try {
        const user = req.cookies.auth;
        if (!user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const parsedUser = JSON.parse(user);
        console.log('Parsed user data:', parsedUser);

        if (!parsedUser.steamIdentifier) {
            console.log('No Steam identifier in cookie data');
            return res.json({ 
                role: 'user',
                steamIdentifier: null,
                message: 'No Steam identifier found'
            });
        }

        // Use Steam identifier directly from cookie data
        const roleQuery = 'SELECT `group` FROM users WHERE identifier = ?';
        
        db.query(roleQuery, [parsedUser.steamIdentifier], (err, results) => {
            if (err) {
                console.error('Group lookup error:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            if (results.length === 0) {
                console.log('No user found for Steam ID:', parsedUser.steamIdentifier);
                return res.json({ 
                    role: 'user',
                    steamIdentifier: parsedUser.steamIdentifier,
                    message: 'No user found'
                });
            }

            let role = 'user';
            switch(results[0].group) {
                case 'admin':
                    role = 'admin';
                    break;
                case 'realtor':
                    role = 'realtor';
                    break;
                default:
                    role = 'user';
            }

            console.log('Role determined:', role);
            res.json({ 
                role: role,
                steamIdentifier: parsedUser.steamIdentifier,
                group: results[0].group
            });
        });
    } catch (error) {
        console.error('Error checking role:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const port = process.env.PORT || 8081

app.listen(8081, ()=> {
    console.log(`Server listening at ${port}`);
})
