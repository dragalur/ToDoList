const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
   console.log('start mid');
   const token = localStorage.getItem('token');

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
   });
};
