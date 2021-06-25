const passport = require('passport');
const routh = require('express').Router();
const { body } = require('express-validator');
// const validToken = require('../middlware/checkUser');
const Card = require('../model/Card');
const controller = require('../controllers/home');

routh.get(
   '/home',
   // validToken,
   passport.authenticate('jwt', { session: false }),
   controller.showCard
);

routh.post(
   '/home',

   passport.authenticate('jwt', {
      session: false
   }),

   body('name').custom(async (value, { req }) => {
      return await Card.findById(req.user._id).then(card => {
         for (let i of card.cardList) {
            if (i.name === value) return Promise.reject('Name of table already exists');
         }
      });
   }),
   controller.createCard
);

module.exports = routh;
