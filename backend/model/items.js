const mongoose= require('mongoose');

const itemSchema= mongoose.Schema({
  title: String,
  description: String,
  location: String,
  type:{
    type: String,
    enum: ["lost", "found"]
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  }
})

module.exports= mongoose.model("Item", itemSchema);