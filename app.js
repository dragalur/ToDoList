const express = require('express');
const app = express();
const routhAuth = require('./routh/auth');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(
   express.urlencoded({
      extended: true,
   })
);

app.get('/', (res, req) => {
   req.send('qgr;qrgubrqgbu');
});
app.use(express.static(__dirname + '/public'));

app.use('/', routhAuth);

module.exports = app;
