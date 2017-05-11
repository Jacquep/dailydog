//user uses cms to enter data this logic gets and posts///manages from db

// *********************************************************************************
// dogpost-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  //READ DATA
  // GET route for getting all of the posts
  app.get("/api/dogposts", function(req, res,next) {
    var query = {};
    if (req.query.doguser_id) {
      query.DogUserId = req.query.doguser_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.DogPost.findAll({
      where: query,
      include: [db.DogUser]
    }).then(function(dbDogPost) {
      //dogposts?
      res.json(dbDogPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/dogposts/:id", function(req, res,next) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.DogPost.findOne({
      where: {
        id: req.params.id
      },
      include: [db.DogUser]
    }).then(function(dbDogPost) {
      res.json(dbDogPost);
      // res.render("dogposts/show", {dogpost: dogpost, title: dogpost.title});
    });
  });
  //CREATE DATA
  // POST route for creating a new post
  app.post("/api/dogposts", function(req, res) {
    //then when the db is finished saving the new post
    db.DogPost.create(req.body).then(function(dbDogPost) {
    //the db will redirect to the new article with the id that has been incremented
    //res.redirect("/dogposts/" + dogpost.id);
      res.json(dbDogPost);
    });
  });
  
// /* Create a new article form. */
// app.get('/new', function(req, res, next) {
//   res.render("dogposts/new", {article: {}, title: "New Post"});
// });

  // DELETE route for deleting posts
  app.delete("/api/dogposts/:id", function(req, res) {
    db.DogPost.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbDogPost) {
      res.json(dbDogPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/dogposts", function(req, res) {
    db.DogPost.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbDogPost) {
        res.json(dbDogPost);
      });
  });
};
