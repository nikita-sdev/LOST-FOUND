const jwt= require('jsonwebtoken');
const dotenv= require('dotenv');
dotenv.config();

const authMiddleware =(req,res,next)=>{
  const authToken= req.headers.authorization;
  if(!authToken){
    return res.status(401).json({msg:"NO token"});
  }

  const token= authToken.split(" ")[1];
  try{
    const decoded= jwt.verify(token, process.env.JWT_KEY);
    req.userId= decoded.id;
    return next();
  }
  catch(err){
    return res.status(401).json({msg:"Invalid token"});
  }
}

module.exports= authMiddleware;