const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
router.get('/user' , postController.user_post);
console.log('post router loaded');
module.exports = router;
