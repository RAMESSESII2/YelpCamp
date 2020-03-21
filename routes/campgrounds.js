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

// Create - add new campground to db

router.post('/', isLogged, (req,res)=>{
	const name=req.body.name;
	const link=req.body.link;
	const desc= req.body.description;
	const author= {
		id: req.user.id,
		username: req.user.username
	}
	const newcamp={name:name, image: link, description: desc,
	author:author};
	Campground.create(newcamp, function(err, newlycreated){
		if(err){
			console.log(err);
		}
		else{
			console.log(newlycreated);
			res.redirect("/campgrounds");
		}
	})
	
});

router.get('/new', isLogged, (req,res)=>{
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

//Edit campground routes
router.get("/:id/edit", checkOwnership, function(req, res){
	//is user loggedin?
	Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit",{campground: foundCampground});
		});	
});

//Update campground routes
router.put("/:id", function(req, res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//destroy route
router.delete("/:id", checkOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else
			res.redirect('/campgrounds');
	});
})

//middlewares
function checkOwnership(req , res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				res.redirect("back");
			}
			else{
				//does user own the campground?
				console.log(foundCampground.author.id); // An object
				console.log(req.user._id); //A string
				if(foundCampground.author.id.equals(req.user._id)){
				next();
				}
				else
					res.redirect("back");
		}
		});
	}else{
		res.redirect("back");
	}

};

function isLogged(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	else
		res.redirect("/login");
};

module.exports= router;