const express= require("express"),
      router= express.Router({mergeParams: true}),
      Campground=require("../models/campgrounds.js"),
      Comment=require("../models/comments.js");

//COMMENT ROUTES=========================
router.get("/new", isLogged, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err)
			console.log(err);
		else
			res.render("comments/new",{campground: campground});			
	});

});

router.post("/", isLogged, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");}
		else{
		Comment.create(req.body.comment,async function(err, comment){
				if(err)
					console.log(err);
				else{			
                    // add username and id to comment
                    comment.author.id= req.user._id;
                    comment.author.username= req.user.username;

                    //save comment
                    comment.save();
        			await campground.comments.push(comment);
					 console.log("Comment added ");
					await campground.save();
					 console.log(comment);
					res.redirect('/campgrounds/'+campground._id);}
			});		
	};
});
});

function isLogged(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	else
		res.redirect("/login");
};

module.exports= router;