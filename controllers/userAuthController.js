const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
exports.signup = async (req,res)=>{
    const {username,email,password}=req.body;
    try{
        const existingUser=await User.findOne({email:email});
        if(existingUser){
            res.status(403).json({message:"User already exists"});
        }
        const salt=await bcrypt.genSalt();
        const passwordToString = password.toString()
        const hashedPassword=await bcrypt.hash(passwordToString,salt);
        await User.create({
            username:username,
            email:email,
            password:hashedPassword
        })       
        res.status(201).json({message:"User created successfully"});

        
    }catch(err){
        res.status(500).json(err.message);
    }
}

exports.login = async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existingUser=await User.findOne({email:email});
        if(!existingUser){
            res.status(403).json({message:"User not found"})
        }

        const passwordToString = password.toString()
        const isMatchPassword= await bcrypt.compare(passwordToString,existingUser.password);
        if(!isMatchPassword){
            res.status(403).json({message:"Invalid password"})
        }
        const token= jwt.sign({
            _id:existingUser._id,
            email:existingUser.email
        },"secret");

        res.cookie("token",token, {
            path:"/",
            expires: new Date(Date.now()+ 1000*60*60*24),
            httpOnly:true,
            sameSite:"lax"
        })
        res.status(200).json({existingUser,token});

    }catch(err){
        console.log(err.message);
    }
}

exports.logout =(req,res)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({message:"Logged out successfully"});

    }catch(err){
        console.log(err.message);
    }
}