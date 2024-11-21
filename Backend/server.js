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

app.get('/', (re, res)=> {
    return res.json("From Backend");
})

app.get('/char', (req, res) => {
    const charsql = "select charidentifier, firstname, lastname, job, discordid, money, age, character_desc, nickname, gender, hours from characters WHERE discordid = '243174457336791041'";
    db.query(charsql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
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

app.listen(8081, ()=> {
    console.log("listening");
})