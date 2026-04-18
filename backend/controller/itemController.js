const Item= require('../model/items');
const User= require('../model/user');
const cloudinary= require('../config/cloudinary');
const user = require('../model/user');


exports.addItem= async(req,res,next)=>{
  try{
    const { title, product, description, location, type}= req.body;
    const user= req.userId;
    console.log(req.userId);
    if (!title || !product || !description || !location || !type) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let imageUrl= "";

    //if image is uploaded
    if(req.file){
      const base64 = req.file.buffer.toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataURI);

      imageUrl= result.secure_url;
    }

    // const aiDescription = await getAIResponse(imageUrl);

    const item= new Item({
      title,product, description, location, type, user, image: imageUrl
    });
    await item.save();
    res.status(201).json({msg: "Item created", item});
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg: "Server error"});

  }
}

exports.getItem= async(req,res,next)=>{
  try{
    const items= await Item.find().sort({createdAt: -1});
    res.json(items);
  }
  catch(err){
    res.status(500).json({msg: "server error"});
  }
}

exports.getItemById= async(req,res,next)=>{
  try{
    const item = await Item.findById(req.params.id).populate("user").populate("claims.user");
    if(!item){
      return res.status(404).json({msg:"Item not found"});
    }
    
    res.json(item);
  }
  catch(err){
    res.status(500).json({msg:"Server error"})
  }
}


//submit answers api
exports.submitAnswers = async(req,res,next)=>{
  try {
    const {answers}= req.body;

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    if (item.user.toString() === req.userId) {
      return res.status(400).json({ msg: "You cannot claim your own item" });
    }

    if (item.status !== "available") {
      return res.status(400).json({ msg: "Item already in process" });
    }

    item.claims.push({
      user: req.userId,
      answers: answers,
      status: "pending",
    });

    item.status = "under_verification";

    await item.save();
    res.json({msg: "Answers submitted", item});
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg: "Server error"})
  }
}

//getting owner items api
exports.getOwnerItems= async(req,res,next)=>{
  const items= await Item.find({user: req.userId});
  res.json(items);
}

//get items under verification posted by owner
exports.getItemUnderVerification= async(req,res,next)=>{
  const items= await Item.find({user: req.userId, status: "under_verification"}).populate("claims.user", "name email");
  res.json(items);
}

//owner claim update
exports.decideClaim= async(req,res,next)=>{
  try{
    const {itemId, claimId} = req.params;
    const {action}= req.body;

    const curUser= await User.findById(req.userId);

    const item= await Item.findById(itemId);

    if(!item) return res.status(404).json({msg: "Item not Found"});

    if(item.user.toString() !== req.userId){
      return res.status(403).json({msg: "Not Owner"});
    }

    const claim= item.claims.id(claimId);
    if(!claim){
      return res.status(404).json({ msg: "Claim not found" });
    }

    claim.status= action==="approve"? "approved": "rejected";
    let message="";

    if(action==="approve"){
      item.status= "returned";
      message= `Your claim for Item Title: ${item.title} was approved. Contact: ${curUser.email}`
    }

    if(action==="rejected"){
      item.status= "available";
      message= `Your claim for Item Title: ${item.title} was rejected`
    }

    await item.save();
    await User.findByIdAndUpdate(claim.user, {
      $push: {
        notifications: {
          message,
          read:false,
        }
      }
    })

    res.json({msg: "Decision updated", item})
  }
  catch(Err){
    console.log(Err);
    return res.status(500).json({msg: "Server error"});
  }
}

//notification for user
exports.getNotifications = async(req,res)=>{
  const user= await User.findById(req.userId);
  res.json(user.notifications);
}

//markNotificationsRead 
exports.markedNotificationsRead= async(req,res,next)=>{
  const user= await User.findById(req.userId);
  user.notifications.forEach(n=>n.read= true);

  await user.save();

  res.json({msg: "Marked as read"});
}

//user delete item
exports.deleteItem=async(req,res,next)=>{
  const item= await Item.findById(req.params.id);

  if(!item){
    return res.status(404).json({ msg: "Item not found" })
  }

  // if(item.status==="under_verification"){
  //   return res.status(404).json({msg: "Cannot delete as item is under verification"});
  // }

  await Item.findByIdAndDelete(req.params.id);
  res.json({msg: "Item deleted successfully"});
}


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI Image Description Controller
exports.generateDescription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No image uploaded" });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imageParts = [
      {
        inlineData: {
          data: req.file.buffer.toString("base64"),
          mimeType: req.file.mimetype,
        },
      },
    ];

    const prompt = `
      Describe this item for a lost and found system. 
      Be brief and objective. 
      Mention the item name, color, and any unique markings (like stickers or damage). 
      Avoid using words like 'beautiful' or 'nice'.
    `;

    // Generate content
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    res.json({ description: text });

  } catch (err) {
    // Log the actual error to your terminal for debugging
    console.error("AI Error Details:", err.message);
    
    res.json({ description: "AI description can't be generated at the moment" });
  }
};