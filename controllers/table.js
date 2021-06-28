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
