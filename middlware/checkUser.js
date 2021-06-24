module.exports = function (req, res, next) {
   if (!localStorage.getItem('token') && req._parsedOriginalUrl.path != '/auth')
      res.redirect('/auth');
   else next();
};
