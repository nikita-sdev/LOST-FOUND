const express= require('express');

//local modules
const authController= require('../controller/authController');


const router= express.Router();

router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

module.exports= router;