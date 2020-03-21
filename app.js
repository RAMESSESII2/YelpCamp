const express= require('express');

const app= express();
const request=require('request');
const bodyparser=require('body-parser');
const mongoose=require('mongoose'),
	  passport=require("passport"),
	  LocalStrategy=require("passport-local");
const Campground=require("./models/campgrounds.js");
const Comment=require("./models/comments.js"),
	  User=require("./models/user");
const  methodOverride= require("method-override");
app.use(methodOverride("_method"));
//routes module exported here
const campgroundRoutes= require("./routes/campgrounds.js"),
	  commentRoutes= require("./routes/comments"),
	  indexRoutes= require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelpcampdb",{useUnifiedTopology: true});
const seedDB=require("./seeds.js");
app.use(express.static(__dirname+"/public"));


seedDB();  //seed the database

// const campgroundSchema= new mongoose.Schema({
// 	name: String,
// 	image: String,
// 	description: String
// });
// Campground= mongoose.model("Campground", campgroundSchema);


/*	const sites=
		
		,
				
		,
		{
			name: "Prayagraj",
			image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
		},
		{
			name: "Yamunotri",
			image:"https://images.unsplash.com/photo-1539183204366-63a0589187ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
		}	
	]; */

	//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"RamessesII is Ozymandias.",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(function(req, res, next){
	res.locals.currentUser= req.user;
	next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments/",commentRoutes);
app.use("/",indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log('Movie App Server is online');
});