const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const home = require('../controllers/users_controller')
router.get('/' , homeController.home); // getting the controller access      
router.use('/user' , require('./userR')); // accessing the neighbour router // this is use as middleware
router.use('/post' , require('./post')); // this will move to post and post will further move to controller
router.use('/comments' , require('./comment'));

// all router can be access from index.js router 
// router know about the Api
router.use('/v1' , require('./Api/v1'));

console.log("router loaded");
module.exports = router;