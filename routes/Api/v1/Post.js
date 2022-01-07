const express = require('express');
const passport = require('passport');
const router = express.Router();
const postApi = require('../../../controllers/Api/v1/PostApi');

router.get('/' , postApi.index);
// to prevent session cookies from generate we use session false
router.delete('/:id' ,passport.authenticate('jwt' , {session:false}) , postApi.destroy);


module.exports = router;