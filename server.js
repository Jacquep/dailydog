var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var browserify = require("browserify");
var path = require("path");
var cors = require('cors');
var expCors = require("express-cors");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

var sequelize = require("sequelize");

// Requiring our models 
var db = require("./models/index.js");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Static directory
// app.use(express.static("./public"));

//validation and session handling
var expressValidator = require("express-validator");
var expressSession = require("express-session");
//var MySQLStore = require('express-mysql-session');
// (session)

// var options = {
//     host: 'localhost',
//     port: 3306,
//     user: 'session_test',
//     password: 'password',
//     database: 'session_test'
//};
 
//var sessionStore = new MySQLStore(options);

app.use(expressValidator());
app.use(cookieParser());
app.use(expressSession(
  {
    cookie: {maxAge: 60000 * 60 * 24 * 7},
    secret: 'secret',
    
  }));


// app.use()

// //validation and session handling
// var expressValidator = require("express-validator");
// var expressSession = require("express-session");
// var MySQLStore = require('express-mysql-session')(expressSession);
// var SessionStore = require('express-sequelize-session')(expressSession.Store);

// var options = {
//     host: 'us-cdbr-iron-east-03.cleardb.net',
//     port: 3306,
//     user: 'b8ffc7d2029882',
//     password: 'e13ffdcf',
//     database: 'heroku_e274fdfc1bc8b44',
//     pool: {
//       max: 5,
//       min: 0,
//       maxIdleTime: 120000
//     }
// };
// var options = {
//   host: 'localhost',
//   port: 3306,
//   user: "", 
//   database:'daily_dog'
// }

// var Sequelize = new sequelize(options); 

// app.use(expressValidator());
// app.use(cookieParser());
// app.use(expressSession(
//   {
//     key: 'session_cookie_name',
//     secret: 'secret',
//     saveUninitialized: false,
//     resave: false,
//     store: new SessionStore(Sequelize)
//   }));
  
  // db = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  // host: config.mysql.host,
  // dialect: config.mysql.dialect,
  // dialectOptions: {
  //   timeout: 30
  // },
  // pool: {
  //   max: 5,
  //   min: 0,
  //   idle: 30000
  // },
  // });

 
//var sessionStore = new MySQLStore(options);

// app.use(expressValidator());
// app.use(cookieParser());
// app.use(expressSession(
//   {name: 'session',
//   cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
//   secret: 'secrets',
//   saveUninitialized: false, 
//   resave: false,
//   store: sessionStore,
//   duration: 30 * 60 * 1000,
//   activeDuration: 5 * 60 * 1000
// }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exppug = require("pug");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes =============================================================

require("./routes/html-routes.js")(app);
require("./routes/signup-routes.js")(app);
require("./routes/signin-routes.js")(app);
require("./routes/dogpost-routes.js")(app);
// require("./routes/doguser-routes.js")(app);


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});