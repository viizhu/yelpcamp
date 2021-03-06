var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" //refers to model that we refer to with this
    },
    username: String
  }
});

module.exports = mongoose.model("Comment", commentSchema);
