const express = require('express');
const app = express();
const passport = require('passport');
const routhAuth = require('./routh/auth');
const routhHome = require('./routh/home');
const routhTable = require('./routh/table');
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

app.get('/', (res, req) => {
   req.redirect('/auth');
});

app.use('/', routhAuth);
app.use('/', routhHome);
app.use('/', routhTable);

module.exports = app;
