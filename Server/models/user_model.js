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
    profileImage: { type: String, default: 'https://uploads2.yugioh.com/card_images/257/detail/Dark-Magician.jpg?1375127294' },
    date: {
        type: Date,
        default: () => Date.now()
    },
    employees: [{
        type: [Schema.Types.ObjectId],
        ref: 'Employee'
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;