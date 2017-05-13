// *********************************************************************************
// dogpost-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
// =============================================================
var db = require("../models");
var express = require('express');
var pug = require('pug');
// Routes
// =============================================================
module.exports = function(app) {
  //READ DATA
  // GET route for getting all of the posts
  app.get("/api/newsfeed", function(req, res,next) {
    var query = {};
    // if (req.query.doguser_id) {
    //   query.DogUserId = req.query.doguser_id;
    // }

    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.DogPost.findAll().then(function(DogPosts) {
      // var postsHtml = pug.renderFile('./dogpost.js', {
      //   DogPosts: DogPosts,
      // })
      res.render('show', { DogPosts: DogPosts })
      // console.log("hhhhhh", DogPosts);
      // res.send(postsHtml);
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
  app.post("/api/dogposts", function(req, res, next) {
    //then when the db is finished saving the new post
    var newDogPost = {
      title: req.body.title,
      body: req.body.body,
      DogUserId: 1,                     // CHANGE ME PLEASE!!!! HELP!!!   HELP!!!   HELP!!!
    }
    console.log(newDogPost);
    db.DogPost.create(newDogPost).then(function(dbDogPost) {
    //the db will redirect to the new article with the id that has been incremented
    //res.redirect("/dogposts/" + dogpost.id);
      res.send({ redirect: '/newsfeed.html' });
      next();
    }).catch(function(err) {
      console.log("cannot post", err);
      res.json(err);
    })
  });
  // DELETE route for deleting posts
  app.delete("/api/dogposts/:id", function(req, res, next) {
    db.DogPost.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbDogPost) {
      res.json(dbDogPost);
      next();
    });
  });
  //UPDATE
  // PUT route for updating posts
  app.put("/api/dogposts", function(req, res, next) {
    db.DogPost.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbDogPost) {
        res.json(dbDogPost);
        next();
      });
  });
};
