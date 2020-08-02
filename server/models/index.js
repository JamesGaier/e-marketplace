const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('mongodb connected');
})
.catch(err => console.log(err));

module.exports.Item = require('./item');
module.exports.CartItem = require('./cartItem');
module.exports.User = require('./user');
