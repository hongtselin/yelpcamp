const mongoose = require("mongoose"),
      Campground = require("./models/campgrounds"),
      Comment = require("./models/comments");

var data = [
    { 
        name: "Salmon Greek", 
        img: "https://farm3.staticflickr.com/2512/5733464781_8787e851b0.jpg",
        descriptions: "What a great camp!!"
    },
    { name: "Granite Hill", 
      img: "https://farm5.staticflickr.com/4082/4857023755_7e2be75031.jpg",
      descriptions: "What a wonderful camp!!"
    },
    { name: "Mountain Goat's Rest", 
      img: "https://farm4.staticflickr.com/3474/3907198073_2918b28097.jpg",
      descriptions: "What a amazing camp!!"
    }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("campgrounds removed!!!");
        }
    });
    // remove all comments
    Comment.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("comments removed!!!");
        }
    });
    
    // create some seed data
    data.forEach(function(seed){
        // create some campgrounds
        Campground.create(seed, function(err, campground){
            if (err) {
                console.log(err);
            } else {
                console.log("added a camp!!");
                // create some comments and attached to each campground
                Comment.create({
                    text:"This place is great, but I wish there was internet!!",
                    author:"Homer"
                }, function(err, comment){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("created new comments");
                        campground.comments.push(comment);
                        campground.save();
                    }
                });
            } 
        });
    });
};

module.exports = seedDB;