const mongoose = require('mongoose');
const Card = require('../model/Card');

module.exports.showPage = async function (req, res) {
   // console.log(req.query);
   // console.log(req.user);

   const table = await Card.findById({ _id: req.user._id });
   const list = table.cardList.filter((i) => i.name === req.query.table)[0];
   console.log(list);
   res.render('card');
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
