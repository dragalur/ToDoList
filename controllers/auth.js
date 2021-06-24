const bcrypt = require('bcryptjs');
const User = require('../model/User');
const Card = require('../model/Card');
const { validationResult } = require('express-validator');

module.exports.login = async function (req, res, next) {
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.status(400).json({ errorLog: errors.errors[0].msg });
   const candidate = await User.findOne({ mail: req.body.mail });

   await candidate.createAcessToken();
   await candidate.createRefreshToken();
   res.status(301);
   next();
};

module.exports.register = async function (req, res) {
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.render('auth', { errorReg: errors.errors[0].msg });

   const { mail, password } = req.body;
   const salt = bcrypt.genSaltSync(10);
   const user = new User({
      mail: mail,
      password: bcrypt.hashSync(password, salt)
   });
   try {
      await user.save().then(doc => new Card({ _id: doc._id }).save());
      res.render('auth', { errorLog: 'You have registered and can log in' });
   } catch (e) {
      console.log(e);
   }
};

module.exports.showPage = (req, res) => {
   res.render('auth');
};
