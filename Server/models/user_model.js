const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: String,
    default: 'Talent Acquisition Services'
  },
  profileImage: {
    type: String, default: 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png',
  },
  source: {
    type: String,
    default: "normal-auth",
  },
  resetToken: {
    type: String,
    default: "787a896be5383be3be12f63c6cc054e76b95f8c0ee556e2688bb756394773d84",
  },
  resetTokenSentTime: {
    type: Date,
    default: Date.now(),
  },
  resetTokenExpirationTime: {
    type: Date,
    default: Date.now(),
  },
  lastVisited: {
    type: Date,
    default: new Date().toLocaleString()
    ,
  },
  dateCreated: {
    type: String,
    default: () => new Date.toString(),
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;