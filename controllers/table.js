const jwt = require('jsonwebtoken');
const Card = require('../model/Card');

module.exports.showPage = async function (req, res) {
   const table = await Card.findById({ _id: req.user._id });
   const list = table.findTable(req.query.table);
   res.render('table', list);
};

module.exports.updateTable = async function (req, res) {
   try {
      // const table = await Card.findById({ _id: req.user._id });
      // const list = table.findTable(req.params.table);
      const newData = req.body;
      const update = await Card.updateMany(
         { _id: req.user._id, 'cardList.name': req.params.table },
         { $set: { 'cardList.$.name': newData.name, 'cardList.$.table': newData.table } },
         { new: true }
      );
      res.status(200).json(update);
   } catch (e) {
      console.log(e);
   }
};

module.exports.deleteTable = async function (req, res) {
   try {
      const id = jwt.verify(localStorage.getItem('token'), process.env.ACCESS_TOKEN_SECRET).user
         ._id;
      const deleteObject = await Card.updateMany(
         { _id: id },
         {
            $pull: { cardList: { name: req.params.table } }
         }
      );
      res.status(201).json(deleteObject);
   } catch (e) {
      console.log(e);
   }
};
