const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//Generate jwt token
const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7d"});
}

// Register a new user  POST  /api/auth/register  PUBLIC
const registerUser=async(req,res)=>{
 try{
    const {name,email,password,profileImageUrl,adminInviteToken}=req.body;
    //check if user already exists
    const userExists=await User.findOne({email});
    if(userExists){
        return res.status(400).json({message:"User already exists"});
    }

    //Determin user role:Admi if correct token is provided,otherwise Member
    let role="member";
    if(adminInviteToken && adminInviteToken==process.env.ADMIN_INVITE_TOKEN){
        role="admin"
    }

    //hash password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);

    //create new user
    const user=await User.create({
        name,
        email,
        password:hashedPassword,
        profileImageUrl,
        role
    })

    //Return user data with jwt
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        profileImageUrl:user.profileImageUrl,
        token:generateToken(user._id)
    });
 }catch(error){
    res.status(500),json({message:"Server Error",error:error.message});
 }
}

//Login user POST /api/auth/login  PUBLIC
const loginUser=async(req,res)=>{
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
    return res.status(401).json({message:"Invalid Email or Password"});
    }
    //compare password
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid Email or Password"});
    }

    //return user data with jwt
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        profileImageUrl:user.profileImageUrl,
        token:generateToken(user._id)
    });
  }catch(error){
    res.status(500),json({message:"Server Error",error:error.message});
 }
}

//Get user profile GET  /api/auth/profile PRIVATE(requires JWT)
const getUserProfile=async(req,res)=>{
  try{
    const user=await User.findById(req.user.id).select("-password");
    if(!user){
        return res.status(404).json({message:"Server error",error:error.message});
    }
    res.json(user);
  }catch{
    return res.status(500).json({message:"Server error",error:error.message});
  }
}

//Update user profile PUT  /api/auth/profile  PRIVATE(requires JWT)
const updateUserProfile=async(req,res)=>{
  try{
    const user=await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    user.name=req.body.name || user.name;
    user.email=req.user.email || user.email;

    if(req.body.password){
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(req.body.password,salt);
    }

    const updatedUser=await user.save();
    res.json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        role:updatedUser.role,
        token:generateToken(updatedUser._id),
    })
  }catch(error){
    return res.status(500).json({message:"Server error",error:error.message});
  }
}

module.exports={registerUser,loginUser,getUserProfile,updateUserProfile};
