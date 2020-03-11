const mongoose=require("mongoose"),
      passportLocalMongoose=require("passport-local-mongoose"),
      UserSchema= new mongoose.Schema({
            username:String,
            password:String

      });
UserSchema.plugin(passportLocalMongoose);
const User= mongoose.model("User", UserSchema);
module.exports=User;