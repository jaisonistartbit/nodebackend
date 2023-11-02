
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({

  post_name: { type: String },
  post_title: { type: String },
  post_desc: { type: String }



  
});
module.exports = mongoose.model('Post', postSchema);
