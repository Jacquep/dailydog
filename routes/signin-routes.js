

// CRUD to send initial user input to database, use models doguser.js
var db = require("../models");

//password encription handled by google passport
var bcrypt = require('bcrypt');

module.exports = function(app) {



  app.post("/api/signin", function(req, res) {
      console.log(req.body);

      // BODY:
      // {
      //   email: ""
      //   password: ""
  	  // }


  	  // 1. Look for the user in the db
  	  db.DogUser.find({ email: req.body.email }, function(data) {

  	  	// 2.  if we have a user, check password
		bcrypt.compare(req.body.password + "dogs", hash, function(err, result) {
        
        // 3. if the passwords match, initiate a session
        if(result) {
        	req.session.user = data;

         } else {
         	// Passwords don't match
    	};

  	  })

  	
 });





//require npm package
var session = require('client-sessions');

//sep package specs
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

//creating a cookie but not storing user data inside
app.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      res.render('login.jade', { error: 'Invalid email or password.' });
    } else {
      if (req.body.password === user.password) {
        res.redirect('/dogposts');
      } else {
        res.render('login.jade', { error: 'Invalid email or password.' });
      }
    }
  });
});

// //this stores the users info on the cookie....Do I need this?
// app.post('/login', function(req, res) {
//   User.findOne({ email: req.body.email }, function(err, user) {
//     if (!user) {
//       res.render('login.jade', { error: 'Invalid email or password.' });
//     } else {
//       if (req.body.password === user.password) {
//         // sets a cookie with the user's info
///      req.session.user = user;
//         res.redirect('/dashboard');
//       } else {
//         res.render('login.jade', { error: 'Invalid email or password.' });
//       }
//     }
//   });
// });

//send to a templating engine? ie pug?
app.get('/dashboard', function(req, res) {
  res.render('dashboard.jade');
});

//get user data from form to be utilized in template
app.get('/dashboard', function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    User.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        req.session.reset();
        res.redirect('/login');
      } else {
        // expose the user to the template
        res.locals.user = user;
 
        // render the dashboard page
        res.render('dashboard.jade');
      }
    });
  } else {
    res.redirect('/login');
  }
});




app.use(function(req, res, next) {
  if (req.session && req.session.doguser) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

//session middleware >good practice NOT to store the password
app.use(function(req, res, next) {
  if (req.session && req.session.doguser) {
    User.findOne({ email: req.session.doguser.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});