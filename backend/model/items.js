const mongoose= require('mongoose');

const itemSchema= mongoose.Schema({
  title: String,
  product: String,
  description: String,
  location: String,
  type:{
    type: String,
    enum: ["lost", "found"]
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  status: {
  type: String,
  enum: ["available", "claimed"],
  default: "available"
}
}, {timestamps:true});

module.exports= mongoose.model("Item", itemSchema);