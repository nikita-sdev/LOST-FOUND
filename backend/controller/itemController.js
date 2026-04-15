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
    const item = await Item.findById(req.params.id);
    res.json(item);
  }
  catch(err){
    res.status(500).json({msg:"Server error"})
  }
}