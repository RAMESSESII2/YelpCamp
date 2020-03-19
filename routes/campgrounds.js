const express= require("express"),
      router= express.Router(),
      Campground= require("../models/campgrounds.js");
//INDEX- shows all campgrounds
// Campgrounds routes
router.get('/',(req, res)=>{
	
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/yelpgrounds", {sites: allcampgrounds, currentUser: req.user});
		}
	});
	
});

router.post('/',(req,res)=>{
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

router.get('/new',(req,res)=>{
	res.render("campgrounds/newGrounds");
});

router.get('/:id',(req, res)=>{
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

module.exports= router;