const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let counter = 0;

let googleUserSchema = new Schema({
    givenname: {
        type: String,
        required: true
    },
    familyname: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    profilepicture: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
    numberofvisits: {
        type: Number,
        default: counter++
    }
});

const Google = mongoose.model('Google', googleUserSchema);
module.exports = Google;