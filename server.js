const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./addons/register.js');
const image = require('./addons/image.js');
const profile = require('./addons/profile.js');
const signin = require('./addons/signin.js');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'smart-brain'
    }
});

const app = express();

app.use(bodyParse.json());
app.use(cors());


app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:email', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});



app.listen(process.env.PORT || 300, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});