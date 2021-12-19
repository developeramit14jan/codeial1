const express = require('express');
const Passport = require('../cofig/passport-local-strategy');
const router = express.Router();
const postController = require('../controllers/post_controller');
router.post('/user-post' ,Passport.checkAuthentication, postController.user_post);
// passing the id with router
router.get('/destroy/:id' , Passport.checkAuthentication , postController.destroy);
console.log('post router loaded');
module.exports = router;
