var express = require("express");
var router = express.Router({mergeParams: true}); //mergeParams will take the :id from the app.js file to use, otherwise id won't make it through to this route
var Campground = require("../models/campground"); //can't use Campground without requiring where it's referenced
var Comment = require("../models/comment"); //can't use Comment without requiring where it's referenced
//no longer adding all the routes to app (app.get), adding it to router now
var middleware = require("../middleware"); //if you require the directory, it will automatically require the index file

//======================
//COMMENTS ROUTES
//======================
//New Comments
router.get("/new", middleware.isLoggedIn, function(req, res){
  //find campground by ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

//Create Comments
router.post("/", middleware.isLoggedIn, function(req, res){
  //look up campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comments
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          //connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          //redirect to campground show page
          req.flash("success", "Successfully added your comment!");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

//Edit Comments
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err || !foundCampground){
      req.flash("error", "Campground not found");
      return res.redirect("back");
    }
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else {
          res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
    });
  });
});

//Update Comments
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Destroy Comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    }
    else{
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;
