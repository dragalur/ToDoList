const passport = require('passport');
const express = require('express');
const routh = require('express').Router();
const controller = require('../controllers/card');

routh.get('/card?:table', passport.authenticate('jwt', { session: false }), controller.showPage);

// routh.post('/home', passport.authenticate('jwt', { session: false }), controller.createCard);
module.exports = routh;
