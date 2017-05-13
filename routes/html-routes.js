// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/assets/js/home.html"));
    next();
  });

 //loads signin/signup
  app.get("/signup", function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/login.html"))
    next();
  });

  app.get("/signin", function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
    next();
  });
  // cms route loads cms.html for our user to make posts
  app.get("/createpost", function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/assets/js/createpost.html"));
    next();
  });

  // blog route loads our view of the posts
  app.get("/dogposts", function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/dogposts.html"));
    next();
  });


};