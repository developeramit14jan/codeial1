const express = require('express');
const router = express.Router();
// requireing passport

const passport = require('../cofig/passport-local-strategy');
const commentController = require('../controllers/comment');
router.post('/create' ,passport.checkAuthentication, commentController.createcomment);
router.get('/destroy/:id' , passport.checkAuthentication , commentController.destroy);
module.exports = router;