const passport = require('passport');
const routh = require('express').Router();
const controller = require('../controllers/table');

routh.get('/table?:table', passport.authenticate('jwt', { session: false }), controller.showPage);

routh.put(
   '/table/:table',
   passport.authenticate('jwt', { session: false }),
   controller.updateTable
);
module.exports = routh;
