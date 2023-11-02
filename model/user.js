
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({

  user_name: { type: String },
  user_email: { type: String },
  user_password: { type: String }



  
});
module.exports = mongoose.model('User', userSchema);
