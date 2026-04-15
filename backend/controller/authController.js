const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

const User= require('../model/user');


exports.postLogin= async(requestAnimationFrame,res,next)=>{
  try{
    const {email,password}= requestAnimationFrame.body;
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
      {userId:user._id},
      process.env.JWT_KEY,
      {expiresIn: "1d"}
    );

    res.json({token});
  }
  catch(err){
    console.log(err);
  }
}

exports.postSignup= async(requestAnimationFrame,res,next)=>{
  try{
    const {email,password}= requestAnimationFrame.body;

    if(!email || !password){
      return res.status(400).json({msg:"Both fields are required"});
    }

    
    if(!email.endsWith("@gamil.com")){
      return res.status(400).json({msg:"Invalid email format"});
    }

    const existingUser= await User.findOne({email});

    if(existingUser){
      return res.status(400).json({msg: "User already exists"});
    }

    const hashedPass= await bcrypt.hash(password,10);

    const  user= new User({email,password: hashedPass});

    await user.save();
    res.status(201).json({msg:"User created successfully"});
  }
  catch(err){
    console.log(err);
  }
}