const JwtStrategy = require('passport-jwt').Strategy;
//const mongoose = require('mongoose');
const User = require('../model/User');

const option = {
   jwtFromRequest: () => localStorage.getItem('token'),
   secretOrKey: process.env.ACCESS_TOKEN_SECRET,
   usernameField: 'mail',
   passwordField: 'password',
};

module.exports = (passport) => {
   passport.use(
      new JwtStrategy(option, async (payload, done) => {
         try {
            const user = await User.findById(payload.user._id).select('id');

            if (user) done(null, user);
            else done(null, false);
         } catch (e) {
            console.log(e);
         }
      })
   );
};
