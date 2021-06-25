const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userShema = mongoose.Schema({
   name: String,
   password: String,
   mail: String
});

userShema.methods = {
   createAcessToken: async function () {
      try {
         let { _id, mail } = this;
         let accessToken = jwt.sign({ user: { _id, mail } }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 60 * 60
         });

         let time = new Date();
         time.setSeconds(time.getSeconds() + 60 * 60);
         localStorage.setItem('tokenTime', Date.parse(time));
         localStorage.setItem('token', accessToken);

         return accessToken;
      } catch (error) {
         console.error(error);
         return;
      }
   },
   createRefreshToken: async function () {
      try {
         let { _id, mail } = this;
         let refreshToken = jwt.sign({ user: { _id, mail } }, process.env.REFRESH_TOKEN_SECRET);
         return refreshToken;
      } catch (error) {
         console.error(error);
         return;
      }
   }
};

module.exports = mongoose.model('users', userShema);
