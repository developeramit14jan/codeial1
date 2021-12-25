const express = require('express');
const passport = require('../cofig/passport-local-strategy');
const router = express.Router();
// accessing the user controller
const userController = require('../controllers/users_controller');

// accessing the route and controller both
router.get('/profile/:id' ,passport.checkAuthentication, userController.usersProfile);
router.post('/update/:id' , passport.checkAuthentication , userController.update);

// router.use('/signUp' , require('./Signup'));

router.get('/Signup' ,userController.signup);

router.get('/Signin' , userController.Signin); // this router is login page
router.post('/create' , userController.create);
// router.post('/create-session' , userController.createSession);

//use passport as middle ware
 router.post('/create-session' ,  passport.authenticate('local', {failureRedirect:'/user/signin'}), userController.createSession);

 router.get('/sign-out' , userController.destroySession);
 router.get('/sign-in' , userController.userSignIn);



 router.get('/auth/google' , passport.authenticate('google' , {scope :['profile' , 'email']}) );
 router.get('/auth/google/callback' ,  passport.authenticate('google' , {failureRedirect :'/user/signin'} ), userController.createSession);
// ) ;
// router.get('/delete-cookie' , userController.deleteCookie);

// router.get('/create' , userController.createSession);
console.log("user router is loaded");
module.exports = router;