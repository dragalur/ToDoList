const express = require('express');
const app = express();
const passport = require('passport');
const routhAuth = require('./routh/auth');
const routhCard = require('./routh/card');
require('dotenv').config();

app.set('view engine', 'ejs');

if (typeof localStorage === 'undefined' || localStorage === null) {
   const LocalStorage = require('node-localstorage').LocalStorage;
   localStorage = new LocalStorage('./scratch');
}

app.use(passport.initialize());
require('./middlware/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use('/', routhAuth);
app.use('/', routhCard);

app.get('/', (res, req) => {
   req.redirect('/auth');
});

module.exports = app;
