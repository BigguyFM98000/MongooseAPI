const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: false,
        default: "HR personnel",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: false,
        default: "Talent Acquisition Services"
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        required: false,
        default: "6407103069317b75b34b6ab5",
        ref: 'User'
    }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;