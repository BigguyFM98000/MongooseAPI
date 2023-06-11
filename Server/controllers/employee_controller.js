const EmployeeModel = require('../models/employees_model');
const UserModel = require('../models/user_model');

// Create and Save a new employee
exports.create = async (req, res) => {
    if (!req.body.firstname && !req.body.lastname && !req.body.jobtile && !req.body.email && !req.body.phonenumber && !req.body.userId ) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    const employee = new EmployeeModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        user: user._id,
    });
    
    await employee.save().then(data => {
        res.send({
            message: "User created successfully!!",
            employee: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating employee"
        });
    });
};

// Retrieve all employees from the database.
exports.findAll = async (req, res) => {
    try {
        const employee = await EmployeeModel.find();
        res.status(200).json(employee);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Retrieve all employees from the database.
exports.findAllForUser = async (req, res) => {
    try {
        const employee = await EmployeeModel.find({user: req.params.id});
        res.status(200).json(employee);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single Employee with an id
exports.findOne = async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        res.status(200).json(employee);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a employee by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await EmployeeModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Employee not found.`
            });
        }else{
            res.send({ message: "Employee updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete an employee with the specified id in the request
exports.destroy = async (req, res) => {
    await EmployeeModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Employee not found.`
          });
        } else {
          res.send({
            message: "Employee deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};