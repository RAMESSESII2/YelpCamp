const express= require("express"),
      router= express.Router(),
      passport= require("passport"),
      User= require("../models/user.js");

router.get('/',(req, res)=>{
	res.render("campgrounds/home");
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
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});
//show login template
router.get("/login", (req, res)=>{
	res.render("login")
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
	res.redirect("/campgrounds");
});

//MIDDLEWARE

function isLogged(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	else
		res.redirect("/login");
};

module.exports= router;