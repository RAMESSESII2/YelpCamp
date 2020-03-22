const  Campground= require("../models/campgrounds.js"),
       Comment=require("../models/comments.js");
const middleware={};

middleware.checkCampOwnership=function(req , res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
                req.flash("error", "Campground not found");
				res.redirect("back");
			}
			else{
				//does user own the campground?
				//console.log(foundCampground.author.id); // An object
				//console.log(req.user._id); //A string
				if(foundCampground.author.id.equals(req.user._id)){
				next();
				}
                else{
                req.flash("error", "You don't have permission");
                    res.redirect("back");
                }
            }
        });
    }
	else{
        req.flash("error", "You need to be logged in.")
		res.redirect("back");
	}
};

middleware.isLogged=function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
    else
        req.flash("error","You need to login first");
		res.redirect("/login");
};

middleware.checkCommentOwnership=function(req , res, next){
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
        req.flash("error", "Need to log in first");
		res.redirect("back");
	}

};

module.exports=middleware;