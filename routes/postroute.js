const express = require('express');
const {body}=require('express-validator')
const postsController = require('../controller/posts_controller');

const router = express.Router();


router.get('/getpost/:page', postsController.getPosts);


router.post('/addpost',body('name').isLength({min:3,max:20}),body('title','please enter a title ,with length greater that 5 characters').isLength({min:5,max:20}),body('desc','please enter a desc ,with length greater that 10 characters').isLength({min:10,max:50}), postsController.createPost);

router.delete('/deletepost/:id', postsController.deletepost);

module.exports = router;
// graphiql: true,
