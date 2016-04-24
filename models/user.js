// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define our user schema
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// execute before each user.save() cal
UserSchema.pre('save', function(callback){
	var user = this;

	//breakout if the password hasnt changed
	if(!user.isModified('password')) return callback();

	//password changed so we need to hash it
	bcrypt.genSalt(5, function(err, salt) {
		if (err) return callback(err);

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return callback(err);
			user.password = hash;
			callback();
		});
	});
});

UserSchema.methods.verifyPassword = function(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch) 	{
		if(err) return cb(err);
		cb(null, isMatch);
	});
};

//export the mongoose model
module.exports = mongoose.model('User', UserSchema);