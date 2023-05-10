const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    given_name: {
        type: String,
        required: true
    },
    family_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
});

const Google = mongoose.model('Google', userSchema);
module.exports = Google;