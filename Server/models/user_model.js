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
    date: {
        type: Date,
        default: () => Date.now()
    },
    employee: {
        type: [Schema.Types.ObjectId],
        ref: 'Employee'
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;