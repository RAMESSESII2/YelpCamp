const express= require('express');
const app= express();
const request=require('request');
const bodyparser=require('body-parser');
const mongoose=require('mongoose'),
	  passport=require("passport"),
	  LocalStrategy=require("passport-local");
const Campground=require("./models/campgrounds.js");
const Comment=require("./models/comments.js"),
	  User=require("./models/user")
mongoose.connect("mongodb://localhost:27017/yelpcampdb",{useUnifiedTopology: true});
const seedDB=require("./seeds.js");
app.use(express.static(__dirname+"/public"));
seedDB();
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

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.get('/',(req, res)=>{
	res.render("campgrounds/home");
});

app.get('/campgrounds',(req, res)=>{
	
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/yelpgrounds", {sites: allcampgrounds});
		}
	});
	
});

app.post('/campgrounds',(req,res)=>{
	const name=req.body.name;
	const link=req.body.link;
	const desc= req.body.description;
	const newcamp={name:name, image: link, description: desc};
	Campground.create(newcamp, function(err, newlycreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	})
	
});

app.get('/campgrounds/new',(req,res)=>{
	res.render("campgrounds/newGrounds");
});

app.get('/campgrounds/:id',(req, res)=>{
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			console.log(foundCampground);
			res.render("campgrounds/show", {campground : foundCampground});
		}
	});
});
//COMMENT ROUTES=========================

app.get("/campgrounds/:id/comments/new",function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err)
			console.log(err);
		else
			res.render("comments/new",{campground: campground});			
	});

});

app.post("/campgrounds/:id/comments",function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");}
		else{
		Comment.create(req.body.comment,async function(err, comment){
				if(err)
					console.log(err);
				else{						await campground.comments.push(comment);
					 console.log("Comment added ");
					await campground.save();
					 console.log(comment);
					res.redirect('/campgrounds/'+campground._id);}
			});		
	};
});
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log('Movie App Server is online');
});