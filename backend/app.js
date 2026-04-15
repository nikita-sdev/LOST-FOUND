const express= require('express');
const mongoose= require('mongoose');
const cors=require('cors');
require('dotenv').config();

//local modules
const authRouter= require("./router/authRouter");

const app= express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", authRouter);


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  app.listen(process.env.PORT, (req,res)=>{
    console.log(`Server running at port ${process.env.PORT}`);
  })
})
.catch(err=>{
  console.log(err);
})