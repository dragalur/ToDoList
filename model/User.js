const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userShema = mongoose.Schema({
   name: String,
   password: String,
   mail: String,
});

userShema.methods = {
   createAcessToken: async function () {
      try {
         let { _id, mail } = this;
         let accessToken = jwt.sign(
            { user: { _id, mail } },
            config.ACCESS_TOKEN_SECRET,
            {
               expiresIn: '15s',
            }
         );
         return accessToken;
      } catch (error) {
         console.error(error);
         return;
      }
   },
   createRefreshToken: async function () {
      try {
         let { _id, mail } = this;
         let refreshToken = jwt.sign(
            { user: { _id, mail } },
            config.REFRESH_TOKEN_SECRET
         );
         return refreshToken;
      } catch (error) {
         console.error(error);
         return;
      }
   },
};

module.exports = mongoose.model('users', userShema);
