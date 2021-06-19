const mongoose = require('mongoose');
const count = mongoose.Schema(
   {
      name: String,
      fields: [String]
   },
   { _id: false }
);

const card = mongoose.Schema(
   {
      name: String,
      table: [count]
   },
   { _id: false }
);

const cardShema = mongoose.Schema({
   _id: mongoose.ObjectId,
   cardList: [card]
});

module.exports = mongoose.model('cards', cardShema);
