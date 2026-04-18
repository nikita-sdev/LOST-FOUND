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
  image: String,
  status: {
  type: String,
  enum: ["available", "under_verification", "returned","rejected"],
  default: "available"
},
claims: [
    {
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      answers: [
        {
          question: String,
          answer: String,
        }
      ],
      status:{
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
      },
    },
]
}, {timestamps:true});

module.exports= mongoose.model("Item", itemSchema);