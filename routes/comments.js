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

router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
	
});

router.put("/:comment_id", checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
 
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
	Comment.findByIdAndDelete(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else
		res.redirect("/campgrounds/"+req.params.id);
	});
});

//middlewares
function checkCommentOwnership(req , res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			}
			else{
				//does user own the campground?
			//	console.log(foundCampground.author.id); // An object
			//	console.log(req.user._id); //A string
				if(foundComment.author.id.equals(req.user._id)){
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