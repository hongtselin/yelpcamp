const mongoose = require("mongoose");

// set up campground schema and model
var campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    descriptions: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;