var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware"); //if you require the directory, it will automatically require the index file

//no longer adding all the routes to app (app.get), adding it to router now

//======================
//CAMPGROUND ROUTES
//======================

//Show you all the campgrounds available
router.get("/", function(req, res){
  //Get all campgrounds from DB
  Campground.find({}, function(err, campgrounds){
    if(err) {
      console.log(err);
    } else{
      //same as calling an array, just this time it's calling from a db instead
      res.render("campgrounds/index", {campgrounds: campgrounds}); //currentUser checks if there is a user logged in or not
    }
  });
});

//Create new campground; this route is different from the get /campgrounds route
router.post("/", middleware.isLoggedIn, function(req, res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  } //added in author
  var newCampground = {name: name, image: image, price: price, description: desc, author: author};
  //create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else{
      console.log(newlyCreated);
      //redirect back to campgrounds (get) page
      res.redirect("/campgrounds"); //default of redirect is to redirect as a get route
    }
  });
});

//Show the form that will send the data to the /campgrounds POST
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new"); //views/new.ejs
});

//Show route; shows more info about one campground
//Needs to go after /campgrounds/new route
router.get("/:id", function(req,res){
  //find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err || !foundCampground){
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    } else{
      //render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  //find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    } else {
      //redirect somewhere (the show page)
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground deleted");
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
