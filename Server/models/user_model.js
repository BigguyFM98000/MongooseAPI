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
    profileImage: { type: String, default: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=' },
    source: {
        type: String,
        default: "normal-auth",
      },
    lastVisited: {
        type: Date,
        default: new Date(),
      },
    dateCreated: {
        type: Date,
        default: () => Date.now()
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;