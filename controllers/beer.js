// load require packages
var Beer = require('../models/beer');

//create endpoint /api/beers for POSTS
exports.postBeers = function(req, res) {
	var beer = new Beer();

	beer.name = req.body.name;
	beer.type = req.body.type;
	beer.quantity = req.body.quantity;
	
	beer.userId = req.user._id;


	//save beer
	beer.save(function(err) {
	if(err)
		res.send(err);
		res.json({ message: 'Beer added to the locker!', data: beer });
	});
};

//create endpoint for /api/beers for GET
exports.getBeers = function(req, res) {
	Beer.find({ userId: req.user._id }, function(err, beers) {
		if(err)
			res.send(err);
		res.json(beers);
	});
};

//create endpoint for /api/beers/:beers_id for GET
exports.getBeer = function(req, res) {
	Beer.findById({ userId: req.user._id, _id: req.params.beer_id }, function(err, beer) {
		if(err)
			res.send(err);
		res.send(beer);
	});
};

//create endpoint for /api/beers/:beer_id PUT
exports.putBeer = function(req, res) {
	Beer.update({ userId: req.user._id, _id: req.params.beer_id }, { quantity: req.body.quantity }, function(err, num, raw) {
		if(err)
			res.send(err);

		res.json({ message: num + ' updated'});
	});
};

//create endpoint for /api/beers/:beer_id DELETE
exports.deleteBeer = function(req, res) {
	Beer.remove({ userId: req.user._id, _id: req.params.beer_id }, function(err) {
		if(err)
			res.send(err);
		res.json({ message: 'Beer removed from locker' });
	});
};
