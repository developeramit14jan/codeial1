const express = require('express');
const router = express.Router();
const user_api = require('../../../controllers/Api/v1/user_api');

router.post('/createsession' , user_api.createSession);
module.exports = router;