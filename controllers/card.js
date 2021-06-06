const mongoose = require('mongoose');
const Card = require('../model/Card');

module.exports.showCard = async function (req, res) {
   const card = await Card.findById(req.user._id);
   res.render('card', { cards: card.cardList });
};

module.exports.createCard = async function (req, res) {
   const card = await Card.findOne({ _id: req.user._id });
   if (card) {
      try {
         const update = await Card.findOneAndUpdate(
            { _id: card._id },
            { $push: { cardList: { name: req.body.name } } },
            { new: true, useFindAndModify: false }
         );
         res.status(200).json(update);
      } catch (e) {
         console.log(e);
      }
   } else {
      res.status(409).json({ message: 'Mail is not exist' });
   }
};
