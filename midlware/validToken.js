const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
   console.log('start mid');
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   if (token == null) return res.status(401);

   jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
   });
};
