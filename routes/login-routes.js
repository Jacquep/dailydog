// CRUD to send initial user input to database, use models doguser.js
var db = require("../models");

//password encription handled by google passport
var passport = require("passport-google")

module.exports = function(app) {

  app.post("/api/doguser", function(req, res){
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.DogUser.create({
      dog_name: req.body.text,
      breed: req.body.text,
      age: req.body.text,
      fav_activity: req.body.text,
      owner: req.body.text,
      
      
      email: req.body.text,
      password: req.body.text,
      
    }).then(function(dbDogUser) {
      // We have access to the new DogUser as an argument inside of the callback function
      res.json(dbDogUser);
    });
  });
  
  
  
   //insert the passport code here
  // passport.use(new GoogleStrategy({
  //   returnURL: 'http://localhost:3000/auth/google/return',
  //   realm: 'http://localhost:3000/'
  // },
  // function(identifier, done) {
  //   User.findByOpenID({ openId: identifier }, function (err, user) {
  //     return done(err, user);
  //   });
  // }));

app.get('/auth/google',
  passport.authenticate('google'),
  function(req, res){
    // The request will be redirected to Google for authentication, so
    // this function will not be called.
  });

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
 
  //render to a new page here
  
};
