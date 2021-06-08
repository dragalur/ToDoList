const express = require('express');
const routh = express.Router();
const controller = require('../controllers/auth');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const passport = require('passport');
const midlvare = require('../middlware/validToken');
const User = require('../model/User');

routh.post(
   '/register',
   body('mail').custom(async (value) => {
      return await User.findOne({ mail: value }).then((user) => {
         if (user) return Promise.reject('Email already exsist');
      });
   }),
   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),
   controller.register
);

routh.post(
   '/login',
   body('mail').custom(async (value) => {
      return await User.findOne({ mail: value }).then((user) => {
         if (!user) return Promise.reject('Email not found');
      });
   }),
   body('password').custom(async (value, { req }) => {
      return await User.findOne({ mail: req.body.mail }).then((user) => {
         if (!bcrypt.compareSync(value, user.password))
            return Promise.reject('Password is incorrect');
      });
   }),
   controller.login,
   passport.authenticate('jwt', {
      session: false,
      successRedirect: '/card',
      failureRedirect: '/auth',
   })
);

routh.get('/auth', controller.showPage);

routh.get('/logout', function (req, res) {
   req.logout();
   localStorage.removeItem('token');
   res.redirect('/');
});

module.exports = routh;
