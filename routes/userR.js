const express = require('express');
const router = express.Router();
// accessing the user controller
const userController = require('../controllers/users_controller');

// accessing the route and controller both
router.get('/profile' , userController.usersProfile);


// router.use('/signUp' , require('./Signup'));

router.get('/Signup' ,userController.signup);

router.get('/Signin' , userController.Signin); // this router is login page
router.post('/create' , userController.create);

// router.get('/create' , userController.createSession);
console.log("user router is loaded");
module.exports = router;