const bcrypt = require('bcryptjs');
const User = require('../model/User');
const Card = require('../model/Card');
const { validationResult } = require('express-validator');

module.exports.login = async function (req, res, next) {
   const errors = validationResult(req);
   // if (!errors.isEmpty()) return res.send({ errorLog: errors.errors[0].msg });
   if (!errors.isEmpty()) return res.render('auth', { errorLog: errors.errors[0].msg });

   const candidate = await User.findOne({ mail: req.body.mail });

   const token = await candidate.createAcessToken();
   await candidate.createRefreshToken();
   localStorage.setItem('token', token);
   res.status(200);
   next();
};

module.exports.register = async function (req, res) {
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.render('auth', { errorReg: errors.errors[0].msg });

   const { mail, password, name } = req.body;
   const salt = bcrypt.genSaltSync(10);
   const user = new User({
      name: name,
      mail: mail,
      password: bcrypt.hashSync(password, salt),
   });
   try {
      await user.save().then((doc) => new Card({ _id: doc._id }).save());
      res.render('auth', { errorLog: 'You have registered and can log in' });
   } catch (e) {
      console.log(e);
   }
};

module.exports.showPage = (req, res) => {
   res.render('auth');
};
