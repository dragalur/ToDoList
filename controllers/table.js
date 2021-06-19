const Card = require('../model/Card');

module.exports.showPage = async function (req, res) {
   const table = await Card.findById({ _id: req.user._id });
   const list = table.cardList.filter(i => i.name === req.query.table)[0];
   res.render('table', list);
};
