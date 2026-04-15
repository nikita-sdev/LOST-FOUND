const express= require('express');
const mongoose= require('mongoose');
const cors=require('cors');
require('dotenv').config();

//local modules
const authRouter= require("./router/authRouter");
const itemRouter= require("./router/itemRouter")

const app= express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", authRouter);
app.use('/api', itemRouter);


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  app.listen(process.env.PORT, (req,res)=>{
    console.log(`Server running at port ${process.env.PORT}`);
  })
})
.catch(err=>{
  console.log(err);
})