//load require packages
var mongoose = require('mongoose');

//define our token schema
var TokenSchema = new mongoose.Schema({
	value: { type: String, required: true },
	userId: { type: String, required: true },
	clientId: { type: String, required: true }
});

module.exports = mongoose.model('Token', TokenSchema);

//should implement a strong hashing scheme for the access token.
