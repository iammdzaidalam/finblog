const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'adwadagff31243rfefsdf21r324g3g';
const cookieParser = require('cookie-parser');
const salt = bycrypt.genSaltSync(10);

app.use(cookieParser());
app.use(cors({credentials:true, origin:true}));
app.use(express.json());

mongoose.connect('mongodb+srv://ZaidAlam:Zaid786$@finblog.xyei5.mongodb.net/?retryWrites=true&w=majority&appName=Finblog');

app.post('/register', async(req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({username, password:bycrypt.hashSync(password,salt),});
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }

});

app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bycrypt.compareSync(password, userDoc.password);
    if(passOk){
        //logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) =>{
            if(err) throw err;
            res.cookie('token',token).json({
                username,
                id:userDoc._id,
            });
        });
    }
    else{
        res.status(400).json('Invalid Password');
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret,{}, (err, info) => {
        if(err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token','').json('ok');
});

app.post('/post', (req, res) => {})

app.listen(4000);