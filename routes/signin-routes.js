// CRUD to send initial user input to database, use models doguser.js
var db = require("../models");

//password encription handled by google passport
var bcrypt = require('bcrypt');

module.exports = function(app) {
  


  app.post("/api/doguser", function(req, res){
    console.log(req.body);
    var hash = "todo";
    bcrypt.compare('?doguser_password', hash, function(err, res) {
        if(res) {
        // Passwords match
         } else {
         // Passwords don't match
        }
    });
  });

};