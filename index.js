const app = require('./app');
const mongoose = require('mongoose');

mongoose
   .connect(process.env.URI + 'Register', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
   })
   .then(() => console.log('DB connect'))
   .catch((err) => console.log(err));
app.listen(process.env.PORT, () => {});
