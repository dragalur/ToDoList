const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Card = require('../model/Card');

module.exports.showCard = async function (req, res) {
   const card = await Card.findById(req.user._id);
   res.render('home', { cards: card.cardList });
};

module.exports.createCard = async function (req, res) {
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.render('home', { error: errors.errors[0].msg });

   try {
      const update = await Card.findOneAndUpdate(
         { _id: card._id },
         { $push: { cardList: { name: req.body.name } } },
         { new: true, useFindAndModify: false }
      );
   } catch (e) {
      console.log(e);
   }
};
