module.exports = function (req, res, next) {
   if (localStorage.getItem('tokenTime') < Date.parse(new Date())) localStorage.removeItem('token');
   if (!localStorage.getItem('token') && req._parsedOriginalUrl.path != '/auth') {
      res.redirect('/auth');
   } else next();
};
