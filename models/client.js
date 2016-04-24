// load modules for packages
var mongoose = require('mongoose');

//define our client shcema
var ClientSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  id: { type: String, required: true },
  secret: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Client', ClientSchema);

// consider auto generating the client id and secrete in order to
// enforce uniqueness, randomness, and strength
