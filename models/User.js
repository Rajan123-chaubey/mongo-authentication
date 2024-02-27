const mongoose =require('mongoose');

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    }
},{timestamps:true});

const User =mongoose.model("User", userSchema);
module.exports=User;