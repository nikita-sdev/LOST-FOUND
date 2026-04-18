const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

const User= require('../model/user');
require('dotenv').config();

exports.postLogin= async(req,res,next)=>{
  try{
    const {email,password}= req.body;
    if(!email || !password){
      return res.status(400).json({msg:"Both fields are required"});
    }

    const user= await User.findOne({email});
    if(!user){
      return res.status(400).json({msg: "Invalid email"});
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
      return res.status(400).json({msg:"Incorrect password, please retry"});
    }

    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_KEY,
      {expiresIn: "10d"}
    );

    res.json({token});
  }
  catch(err){
    console.log(err);
  }
}

exports.postSignup= async(req,res,next)=>{
  try{
    const {email,password,name}= req.body;

    if(!email || !password){
      return res.status(400).json({msg:"Both fields are required"});
    }

    
    if(!email.endsWith("@gmail.com")){
      return res.status(400).json({msg:"Invalid email format"});
    }

    const existingUser= await User.findOne({email});

    if(existingUser){
      return res.status(400).json({msg: "User already exists"});
    }

    const hashedPass= await bcrypt.hash(password,10);

    const  user= new User({email,password: hashedPass,name});

    await user.save();
    res.status(201).json({msg:"User created successfully"});
  }
  catch(err){
    console.log(err);
  }
}