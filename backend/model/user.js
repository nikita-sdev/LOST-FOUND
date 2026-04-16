const mongoose = require('mongoose');

const userSchema= mongoose.Schema({
  email:{
    type:String,
    required: true,
  }, 
  password:{
    type:String,
    required:true,
  },
  name: { type: String }, 
  notifications: [
    {
      message: String,
      read: {type: Boolean, default:false}
    }
  ]
})

module.exports = mongoose.model("User",userSchema);