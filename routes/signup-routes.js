// CRUD to send initial user input to database, use models doguser.js
var db = require("../models");

//password encription handled by google passport
var bcrypt = require('bcrypt');

module.exports = function(app) {



  app.post("/api/doguser", function(req, res) {
      console.log(req.body);
      // create takes an argument of an object describing the item we want to
      // insert into our table. In this case we just we pass in an object with a text
      // and complete property (req.body)

      bcrypt.hash(req.body.password, 10, function(err, hash) {
          if (err) {
              res.json(err);
          }
          db.DogUser.create({
              dog_name: req.body.dogName,
              breed: req.body.breed,
              age: req.body.age,
              fav_activity: req.body.favActivity,
              owner: req.body.owner,
              email: req.body.email,
              password: hash,
              imgURL: req.body.imgURL

          }).then(function(dbDogUser) {
              // We have access to the new DogUser as an argument inside of the callback function
              res.json(dbDogUser);
          });

      });

  });
};