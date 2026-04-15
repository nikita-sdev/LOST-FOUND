const express= require('express');

//local modules
const itemController= require('../controller/itemController');
//middleware;
const authMiddleware = require('../middleware/authMiddleware');


const router= express.Router();

router.post("/add-post",authMiddleware, itemController.addItem);

router.get("/home", authMiddleware, itemController.get);



module.exports= router;