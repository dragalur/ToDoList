const passport = require('passport');
const routh = require('express').Router();
const controller = require('../controllers/table');
// const validToken = require('../middlware/checkUser');

routh.get(
   '/home/table?:table',
   // validToken,
   passport.authenticate('jwt', { session: false }),
   controller.showPage
);

routh.put(
   '/home/table/:table',
   passport.authenticate('jwt', { session: false }),
   controller.updateTable
);
module.exports = routh;
