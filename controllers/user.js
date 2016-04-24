// load require packages
var User = require('../models/user');

//create endpoint /api/users for POSTS
exports.postUsers = function(req, res) {
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err) {
		if(err)
			res.send(err);

		res.json({ message: 'new beer drinker added to the locker room'});
	});
};

// create endpoint /api/users for GET
exports.getUsers = function(req, res) {
	User.find(function(err, users) {
		if (err)
			res.send(err);
		res.json(users);		
	});
};
