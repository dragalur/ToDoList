const bcrypt = require('bcryptjs');
const User = require('../model/User');
const Card = require('../model/Card');
const { validationResult } = require('express-validator');

module.exports.login = async function (req, res) {
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.render('index', { errorLog: errors.errors[0].msg });

   const candidate = await User.findOne({ mail: req.body.mail });
   if (candidate) {
      const password = bcrypt.compareSync(req.body.password, candidate.password);
      if (password) {
         const token = await candidate.createAcessToken();
         const refreshToken = await candidate.createRefreshToken();
         localStorage.setItem('token', token);
         res.status(200).json({
            acessToken: `Bearer ${token}`,
            refreshToken: `Bearer ${refreshToken}`,
         });
      } else res.status(401).json({ message: 'Password are not same' });
   } else res.status(409).json({ message: 'Mail is not exist' });
};

module.exports.register = async function (req, res) {
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.render('index', { errorReg: errors.errors[0].msg });

   const candidate = await User.findOne({ mail: req.body.mail });

   if (candidate) {
      res.status(409).json({ message: 'Email is exist' });
   } else {
      const { mail, password, name } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const user = new User({
         name: name,
         mail: mail,
         password: bcrypt.hashSync(password, salt),
      });
      try {
         await user.save().then((doc) => new Card({ _id: doc._id }).save());

         res.render('index', { message: 'You have regester' });
      } catch (e) {
         console.log(e);
      }
   }
};

module.exports.showPage = (req, res) => {
   res.render('index');
};
