var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

//Seed data
var data = [
  {
    name: "Hammock Lake",
    image: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fc6ce87dd15dab5e29cb7173eeab67aa&auto=format&fit=crop&w=1353&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Desert Mesa",
    image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&s=73115e54fa3d099fcb2d92ccf12eee41&auto=format&fit=crop&w=1353&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Cloud's Rest",
    image: "https://images.unsplash.com/photo-1511701455363-d46ed8e3b728?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d65813b9b3ed6a869d4895f0282988a3&auto=format&fit=crop&w=1350&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

function seedDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err){
    // if(err){
    //   console.log(err);
    // }
    // console.log("removed campgrounds");
    // Comment.remove({}, function(err){
    //   if(err){
    //     console.log(err);
    //   }
    //   console.log("removed comments");
    //   //add a few campgrounds
    //   data.forEach(function(seed){
    //     Campground.create(seed, function(err, campground){
    //       if(err){
    //         console.log(err);
    //       } else {
    //         console.log("added a campground");
    //         //create a comment
    //         Comment.create(
    //           {
    //             text: "This place is great, but I wish there was internet",
    //             author: "Homer"
    //           }, function(err, comment){
    //             if(err){
    //               console.log(err);
    //             } else {
    //               campground.comments.push(comment); //push comment to campground
    //               campground.save(); //save comment
    //               console.log("Created new comment");
    //             }
    //           });
    //       }
    //     });
    //   });
    // });
  });
}

module.exports = seedDB;
