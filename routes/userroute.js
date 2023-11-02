const express = require('express');
// const {body}=require('express-validator')
const postsController = require('../controller/user_controller');

const router = express.Router();


router.post('/signup', postsController.signup);
router.post('/login', postsController.login);





module.exports = router;