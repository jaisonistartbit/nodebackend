const bcrypt = require('bcryptjs');
const User=require('../model/user');
const validator=require('validator');
const post = require('../model/post');
// const jwt=require('jsonwebtoken');
module.exports={
   createUser:async function({userInput},req){
    const error=[];
    if(!validator.isEmail(userInput.email)){
        error.push({message:'E-Mail is invalid'})
        console.log('email');
    }
    if(validator.isEmpty(userInput.password)||!validator.isLength(userInput.password,{min:5})){
        error.push({message:'password too short!'})
        console.log('pass');

    }
    if(error.length >0){
        const error=new Error('Invalid input');
        throw error;
    }
    const existingUser=await User.findOne({user_email:userInput.email});
    if(existingUser){
        const errors=new Error('User Already Exist');

      throw errors;
    }
    
    const hashedpassword=await bcrypt.hash(userInput.password,12);
    const user=new User({
        user_email:userInput.email,
        user_name:userInput.name,
        user_password:hashedpassword
    });
    const createdUser=await user.save();
    return {
        name:userInput.name,
        email:userInput.email,
        password:userInput.password,
   
    }
   },

   login:async function({email,password}){
    const user=await User.findOne({user_email:email});
    if(!user){
        const error =new Error('user jot found');
        error.code=401;
        console.log(error);
        throw error;
    };
    const isEqual=await bcrypt.compare(password,user.user_password);
    if(!isEqual){
        const error=new Error('password incorrect');
        error.code=401;
        console.log(error);

        throw error;
    }
    return {userId:user._id.toString()};
   },



   createPost:async function ({postInput},req){


   const Post=new post({
    post_title:postInput.title,
    post_name:postInput.name,

    post_desc:postInput.desc,

   })
   console.log("haadf");

   const created=await Post.save();
   console.log("haa");
   return {
    name:postInput.name,
    title:postInput.title,
    desc:postInput.desc
   }
}
}


