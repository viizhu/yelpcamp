var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"), //pull the campground schema
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds"),
    flash       = require("connect-flash");

    //^the above works the same as:
    // var express = require("express");
    // var app = express();
    // var bodyParser = require("body-parser");
    // var mongoose = require("mongoose");

//Requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

 //use yelpcamp database
mongoose.connect("process.env.DATABASEURL"); //on local server, use local database
    //command line: export DATABASEURL=mongodb://localhost/yelp_camp
    //Heroku Settings: Config Variables > KEY = DATABASEURL; VALUE = mongodb://yelpcamp:ycdbpass@ds119489.mlab.com:19489/yelpcamp
    //This way, while on local test, it will use the local database, when on Heroku servers it will use the mlab database
//Can also run environment for Heroku through commandline:
    //heroku config:set KEY=VALUE
    //heroku config:set DATABASEURL=mongodb://yelpcamp:ycdbpass@ds119489.mlab.com:19489/yelpcamp
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //__dirname is the directory that the script lives in; this serves the public directory
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seeding data into the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hermes is the best doggo",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware that will check if currentUser is empty (not logged in) or if a user is logged in
//This will call this function on every route
app.use(function(req, res, next){
  res.locals.currentUser = req.user; //whatever is in res.locals is available inside the template
  //differenciate between an error and a success message that can be used on any page:
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//Tell app to use the following routes
//it takes the route and appends the /campgrounds/:id/comments or /campgrounds in front of them. So in the actual file, instead of typing /campgrounds/new, it's just /new route
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The YelpCamp Server has started");
});

// app.listen(3000, function(){
//   console.log("Yelp Camp Server has started");
// });
