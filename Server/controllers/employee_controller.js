const EmployeeModel = require('../models/employees_model');
const UserModel = require('../models/user_model');

// Create and Save a new employee
exports.create = (req, res) => {
    if (!req.body.firstname && !req.body.lastname && !req.body.jobtile && !req.body.email && !req.body.phonenumber ) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    if (!req.body.userId){
        req.body.userId = "64a075971f69fd0649069afe";
    }
    
    const employee = new EmployeeModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        user: req.body.userId
    });
    
    employee.save().then((response) => {
        res.status(200).json({
            success: true,
            result: response,
            message: "User created successfully!!",
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating employee"
        });
    });
};

// Retrieve all employees from the database.
exports.findAll = async (req, res) => {
    if(!req.params.user) {
        req.params.userId = "64a075971f69fd0649069afe";
    }

    // Find the user who added the employee by their ID
    const user = await UserModel.findById(req.params.userId).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found. You must be logged in.' });
    }

    try {
        const employee = await EmployeeModel.find({user: user._id});
        res.status(200).json(employee);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single Employee with an id
exports.findOne = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    // Find the user who added the employee by their ID
    const user = await UserModel.findById(req.body.userId).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found. You must be logged in.' });
    }

    try {
        const employee = await EmployeeModel.findById(req.params.id).lean();
        res.status(200).json(employee);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a employee by the id in the request
exports.update = async (req, res) => {
    const userId = req.body.userId;
    const employeeId = req.body.employeeId;

    if (!userId) {
      return res.status(404).json({ message: 'User not found. You must be logged in.' });
    }
    
    const data = JSON.stringify({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        user: userId
    });
    const id = req.params.id
    await EmployeeModel.findByIdAndUpdate(employeeId, data, { useFindAndModify: false }).then(data => {
     
            res.status(200).send({ message: "Employee updated successfully." });

    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete an employee with the specified id in the request
exports.destroy = async (req, res) => {
    if(!req.body.userId) {
        res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }
    // Find the user who added the employee by their ID
    const user = await UserModel.findById(req.body.userId).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found. You must be logged in.' });
    }

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