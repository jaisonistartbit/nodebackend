const post = require('../model/post');
const { validationResult } = require('express-validator');
const io=require('../socket');

let no_of_item=2;
exports.getPosts = (req, res, next) => {
// console.log();
let pageno=(req.params.page)||1;
let totalitems;

  let array = [];
  post.find()
  .countDocuments()
  .then(num_of_post => {
    totalitems = num_of_post;
    return post.find().skip((pageno - 1) * no_of_item)
      .limit(no_of_item);
  })
  .then((data) => {
    let page='nonext';
if(no_of_item * pageno < totalitems){
page='next'
}

    res.status(200).json({
      posts: data,
      page:page
    });
  }).catch((err) => {
    console.log(err);
  });

 
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const name = req.body.name;
  const desc = req.body.desc;
  // const image = req.body.image;
  // console.log(req.formData());

  // const error = validationResult(req);
  // // console.log(error.array()[0].msg);

  // if (!error.isEmpty()) {
  //  return res.status(201).json({
  //     message: 'error'
      
  // })}
  const posts = new post({
    post_name: name,
    post_title: title,
    post_desc: desc

  });
  posts.save();
  // io.getIo().emit('posts',{action:'create',post:posts})
  // console.log(title, name, desc);
  res.status(201).json({
    message: 'Post created !',
    post: { name: name, title: title, desc: desc }
  });
};


exports.deletepost=(req,res,next)=>{
  const id=req.params.id;


  post.deleteOne({ _id: id }).then(() => {
    res.status(200).json({ message: 'Success!' });

  }).catch((err) => {
    res.status(500).json({ message: 'Failed.' });
  })

}