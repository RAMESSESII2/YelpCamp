const mongoose= require("mongoose"),
	  Campground=require("./models/campgrounds.js"),
	  Comment=require("./models/comments"),
	  User= require("./models/user"),
	  seeds = [
		  {
		 name:"Heaven",
		 image:"https://phoenixrvpark.com/wp-content/uploads/Best-Car-Camping-Gear.jpg",
		 description:"Diam in arcu cursus euismod quis viverra nibh. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Rutrum quisque non tellus orci ac auctor augue. Gravida arcu ac tortor dignissim convallis aenean et tortor. Et pharetra pharetra massa massa ultricies mi. Vehicula ipsum a arcu cursus vitae. Massa tempor nec feugiat nisl pretium fusce id velit. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Sollicitudin tempor id eu nisl nunc mi ipsum. Urna nunc id cursus metus aliquam eleifend mi in."
		  },{
		  name:"Sunshine",
 image:"https://www.reserveamerica.com/webphotos/racms/articles/images/fef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg",
		description:"Diam in arcu cursus euismod quis viverra nibh. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Rutrum quisque non tellus orci ac auctor augue. Gravida arcu ac tortor dignissim convallis aenean et tortor. Et pharetra pharetra massa massa ultricies mi. Vehicula ipsum a arcu cursus vitae. Massa tempor nec feugiat nisl pretium fusce id velit. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Sollicitudin tempor id eu nisl nunc mi ipsum. Urna nunc id cursus metus aliquam eleifend mi in."
		  },
		   {
		 name:"Heaven",
		 image:"https://phoenixrvpark.com/wp-content/uploads/Best-Car-Camping-Gear.jpg",
		 description:"Diam in arcu cursus euismod quis viverra nibh. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Rutrum quisque non tellus orci ac auctor augue. Gravida arcu ac tortor dignissim convallis aenean et tortor. Et pharetra pharetra massa massa ultricies mi. Vehicula ipsum a arcu cursus vitae. Massa tempor nec feugiat nisl pretium fusce id velit. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Sollicitudin tempor id eu nisl nunc mi ipsum. Urna nunc id cursus metus aliquam eleifend mi in."
		  },{
		  name:"Sunshine",
 image:"https://www.reserveamerica.com/webphotos/racms/articles/images/fef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg",
		description:"Blah Blah Blah Blah"
		  }
	  ];
async function seedDB(){
	try{
		await Campground.deleteMany({});
	// 	console.log('Campgrounds removed');
		 await Comment.deleteMany({});
		 await User.deleteMany({});

	// 	for(const seed of seeds){
	// 			//add few campgrounds
	// 	let campground=await Campground.create(seed);
	// 	console.log('Campgrounds created');
	// 	let comment=await Comment.create({
	// 				text:"This is a great place to visit",
	// 			author:"Holmes"});
	// 	console.log('Comments created');	
	// 	campground.comments.push(comment);
	// 	campground.save();
	// 	console.log('Comments added to campgrounds');
	// };
} 	catch(err){
		console.log(err);
	}
};
	

module.exports=seedDB;