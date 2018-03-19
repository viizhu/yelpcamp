var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
  //is user logged in
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err || !foundCampground){
        req.flash("error", "Campground not found");
        res.redirect("back");
      } else {
        //does user own campground?
        if(foundCampground.author.id.equals(req.user._id)) {
          //foundCampground.author.id is not a string, it's an object; req.user._id is a string, so you can't do ===
          next(); //do whatever is in the code after the middleware
        }  else {
          //if user doesn't own campground, also redirect
          req.flash("error", "You dont' have permission to do that.");
          res.redirect("back");
        }
      }
    });
  } else {
    //if not logged in, redirect
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back"); //takes user back to the previous page they were on.
  }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
  //is user logged in
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        req.flash("error", "Comment not found.");
        res.redirect("back");
      } else {
        //does owner own comment?
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else{
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    //take user back
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that."); //"key", "message"; will take "Please login first" and render it on the next request, which is the redirect to /login, then we handle it in /login
  res.redirect("/login");
}



module.exports = middlewareObj;

//can also do module.exports = {} and then put all the functions in the object.
