//get packages we need
var express = require('express');
var ejs = require('ejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var authController = require('./controllers/auth');
var beerController = require('./controllers/beer');
var clientController = require('./controllers/client');
var oauth2Controller = require('./controllers/oauth2');
var userController = require('./controllers/user');

// connect to the beerlocker mongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

//create our express app
var app = express();

//set the view engine
app.set('view engine', 'ejs');

// use the body parser package in our application
app.use(bodyParser.urlencoded({
	extended: true
}));

// use passport in our application
app.use(passport.initialize());

// use express session support since OAuthorize require it
app.use(session({
	secret: 'Super secret session key',
	saveUninitialized: true,
	resave: true
}))

//use environment defined port or 3000
var port = process.env.PORT || 3000;

//create our express router
var router = express.Router();

//initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
	res.json({ message: 'you are running damn low on beer!' });
});

// Create endpoint handler for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

 router.route('/oauth2/token')
   .post(authController.isClientAuthenticated, oauth2Controller.token);

//register all out routes with /api
app.use('/api', router);

//start the server
app.listen(port);
console.log('Insert beer on port '+ port);
