const express= require("express"),
      router= express.Router(),
      passport= require("passport"),
	  User= require("../models/user.js"),
	  middleware=require("../middleware/index");


router.get('/',(req, res)=>{
	res.render("landing.ejs");
});

//show register form
router.get("/register",(req,res)=>{
	res.render("register");
});
//set sign up logic
router.post("/register", (req, res)=>{
	const newUser= new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.render("register");
		}
		req.flash("success", "WELCOME "+user.username);
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});
//show login template
router.get("/login", (req, res)=>{
	res.render("login");
});
//login post logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){

});

router.get("/logout", (req, res)=>{
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("/campgrounds");
});



module.exports= router;