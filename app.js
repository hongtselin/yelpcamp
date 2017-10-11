// require express, body-parser, mongoose
const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      Campground = require("./models/campgrounds"),
      Comment = require("./models/comments"),
      seedDB = require("./seed");
      

// set template view engine
app.set("view engine", "ejs");

// set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongodb
mongoose.connect("mongodb://localhost/yelp_camp_v4", { useMongoClient: true });
mongoose.Promise = global.Promise;

// clean up database and create seed data
seedDB();


////////// routes start here //////////

// landing page route
app.get("/", function(req, res) {

    res.render("landing");
});

// the index route
app.get("/campgrounds", function(req, res) {
    // get all the campgrounds from db
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            // send data to the campgrounds templete
            res.render("campgrounds/index", { allCampgrounds: allCampgrounds });
        }
    });

});

// the create route
app.post("/campgrounds", function(req, res) {
    var newCamp = req.body;
    // save new campground to db
    Campground.create(newCamp, function(err, newlyCreateCamp) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

// the new route
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new"); 
});

// the show route - showes more info about one campground (can't be define before /campgrounds/new)
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });

});

// ==================
// Comment Routes
// ==================

// the commnet new route
app.get("/campgrounds/:id/comments/new", function(req, res){
    // find a campground by id and send the data to the new route
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
           res.render("comments/new", {campground: foundCampground}); 
        }
    });
    
});

// the comment create route
app.post("/campgrounds/:id/comments", function(req, res){
    // look up campground using id 
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    // associate the comment with the campground
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    // redirect back to campground show route
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
    
});

// start to listen to server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started YelpCamp!!");
});
