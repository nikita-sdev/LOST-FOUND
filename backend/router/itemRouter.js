const express= require('express');

//local modules
const itemController= require('../controller/itemController');
//middleware;
const authMiddleware = require('../middleware/authMiddleware');


const router= express.Router();

router.post("/add-post",authMiddleware, itemController.addItem);

router.get("/home", authMiddleware, itemController.getItem);

router.get("/items/:id", itemController.getItemById);

router.post("/items/:id/claim", authMiddleware, itemController.claimItem);

router.post("/items/:id/answers", authMiddleware, itemController.submitAnswers);

// router.post("/items/:id/verify", authMiddleware, itemController.verifyClaim);

module.exports= router;