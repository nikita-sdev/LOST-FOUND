const express= require('express');

const upload = require("../config/multer");

//local modules
const itemController= require('../controller/itemController');
//middleware;
const authMiddleware = require('../middleware/authMiddleware');


const router= express.Router();

router.post("/add-post",authMiddleware, upload.single("image"), itemController.addItem);

router.get("/home", authMiddleware, itemController.getItem);

router.get("/items/:id", itemController.getItemById);

router.post("/items/:id/answers", authMiddleware, itemController.submitAnswers);

//get owner items route
router.get("/owner/items", authMiddleware, itemController.getOwnerItems);

//owner delete items
router.delete('/items/:id', authMiddleware, itemController.deleteItem);

//get owner items under verification
router.get("/owner/verification", authMiddleware, itemController.getItemUnderVerification);

router.patch("/items/:itemId/claims/:claimId", authMiddleware, itemController.decideClaim);

router.get('/notifications', authMiddleware, itemController.getNotifications);

//user upload image
router.patch("/notifications/read", authMiddleware, itemController.markedNotificationsRead);



module.exports= router;