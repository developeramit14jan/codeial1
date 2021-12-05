const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
router.get('/' , homeController.home); // getting the controller access      
router.use('/user' , require('./user')); // accessing the neighbour router // this is use as middleware
router.use('/post' , require('./post')); // this will move to post and post will further move to controller

// all router can be access from index.js router 
console.log("router loaded");
module.exports = router;