const express = require('express');
const router = express.Router();
// accessing the user controller
const userController = require('../controllers/users_controller');

// accessing the route and controller both
router.get('/profile' , userController.usersProfile);
console.log("user router is loaded");
module.exports = router;