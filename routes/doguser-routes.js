var db = require("../models");

var auth = require("./auth");

module.exports = function(app) {
  app.get("/api/dogposts", auth, function(req, res) {
    db.Author.findAll({}).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/api/dogposts/:id", auth, function(req, res) {

    db.Author.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.post("/api/dogposts", auth, function(req, res) {

    db.Author.create(req.body).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.delete("/api/dogposts/:id", auth, function(req, res) {

    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

};
