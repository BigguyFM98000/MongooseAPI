const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let googleUserSchema = new Schema({
    given_name: {
        type: String,
        required: true
    },
    family_name: {
        type: String,
        required: true
    },
   
    picture: {
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
  
});

const Google = mongoose.model('Google', googleUserSchema);
module.exports = Google;