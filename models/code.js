// load require pacakges
var mongoose = require('mongoose');

//define our teken schema
var CodeSchema = new mongoose.Schema({
	value: { type: String, required: true },
	redirectUri: { type: String, required: true },
	userId: { type: String, required: true },
	clientId: { type: String, required: true }
});

module.exports = mongoose.model('Code', CodeSchema);

//to be extra secure, you should consider hashing the authorization code.
