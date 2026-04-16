const Item= require('../model/items');

exports.addItem= async(req,res,next)=>{
  try{
    const {title,product, description, location,type} =req.body;
    const user= req.userId;
    if(!title || !product || !description || !location || ! type) {
      return res.status(400).json({msg: "All fields are required"});
    }

    const item = new Item({
      title,product,description,location,type,user
    });

    await item.save();
    res.status(201).json({msg:"Item created"})
  }
  catch(err){
    res.status(500).json({msg:"Server error"});
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

//claim api
exports.claimItem = async(req,res,next)=>{
  try{
    const item= await Item.findById(req.params.id);

    if (!item.status !=="available") {
      return res.status(404).json({ msg: "Already claimed" });
    }

    item.status= "under_verification";

    item.claims.push({
      user:req.userId,
      msg: req.body.message||"",
    });

    await item.save();

    res.json({msg: "Claim request sent successfully"
    })
  }
  catch(err){
    res.status(500).json({msg: "Server error"})
  }
}

exports.submitAnswers = async(req,res,next)=>{
  try {
    const {answers}= req.body;

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    // if (item.user.toString() === req.userId) {
    //   return res.status(400).json({ msg: "You cannot claim your own item" });
    // }

    if (item.status !== "available") {
      return res.status(400).json({ msg: "Item already in process" });
    }

    item.claims.push({
      user: req.userId,
      answers: answers,
      status: "pending"
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
