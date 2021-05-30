const express = require('express');
const routh = express.Router();
const controller = require('../controllers/auth');
const midlvare = require('../midlware/validToken');

routh.post('/register', controller.register);
routh.get('/register', (req, res) => {
   res.render('index');
});

routh.post('/login', controller.login);

routh.get('/card', midlvare, (req, res) => {
   console.log('start cont');

   res.render('card');
   console.log(req.user);
});
let c = 0;
module.exports = routh;
