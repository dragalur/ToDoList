const passport = require('passport');
const routh = require('express').Router();
const controller = require('../controllers/table');

routh.get('/table?:table', passport.authenticate('jwt', { session: false }), controller.showPage);

// routh.post('/table', passport.authenticate('jwt', { session: false }), controller.createCard);
module.exports = routh;
