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

cardShema.methods = {
   findTable: function (name) {
      return this.cardList.filter(i => i.name === name)[0];
   }
};

module.exports = mongoose.model('cards', cardShema);
