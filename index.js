const app = require('./app');
const config = require('./config');
const mongoose = require('mongoose');

mongoose
   .connect(config.URI + 'Register', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
   })
   .then(() => console.log('DB connect'))
   .catch((err) => console.log(err));

app.listen(config.PORT, () => {});
