const mongoose = require("mongoose");

// set up comment model
var commentSchema = mongoose.Schema({
   text: String,
   author: String
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;