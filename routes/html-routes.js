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
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/")

  //loads signin/signup
  app.get("/signin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  // cms route loads cms.html for our user to make posts
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads our view of the posts
  app.get("/dogposts", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dogposts.html"));
  });

  // // authors route loads author-manager.html
  // app.get("/authors", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  // });

};