const mongoose = require('mongoose');

// create schema
const { Schema } = mongoose;

const usersSchema = new Schema({
  username: String, 
  password: String,
  email: String,
  fullname: String,
  role: String
});

usersSchema.set('toJSON', {
  virtuals: true,
});

// create and export model 
module.exports = mongoose.model('Users', usersSchema);