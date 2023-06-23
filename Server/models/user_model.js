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
    profileImage: { type: String, default: 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png' },
    source: {
        type: String,
        default: "normal-auth",
      },
      resetToken: {
        type: String,
      },
      resetTokenExpiration: {
        type: String,
      },
    lastVisited: {
        type: Date,
        default: new Date(),
      },
    dateCreated: {
        type: Date,
        default: () => Date.now(),
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;