const passport = require('passport');
const express = require('express');
const routh = require('express').Router();
const controller = require('../controllers/card');

routh.get('/card', passport.authenticate('jwt', { session: false }), controller.showCard);

routh.post('/card', passport.authenticate('jwt', { session: false }), controller.createCard);

module.exports = routh;
