const GoogleModel = require("../models/google_user_model");
const cloudinary = require('cloudinary').v2;
require('dotenv').config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.create = async (req, res, next) => {
   
    const user = new GoogleModel({
        given_name: req.body.given_name,
        family_name: req.body.family_name,
        name: req.body.name,
        picture: req.body.picture,
    });

    await user.save().then(data => {
        res.send({
            message: "Google User added successfully!!",
            user: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding google user"
        });
    });
}

exports.update = async (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    await GoogleModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        } else {
            res.send({ message: "Google user updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// Retrieve all google users from the database.
exports.view = async (req, res) => {
    try {
        const users = await GoogleModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.uploadProfileImage = async (req, res) => {
    try {
        const file = req.file;
        const result = await cloudinary.uploader.upload(file);
        const user = await User.findByIdAndUpdate(
          req.params.userId,
          { profileImage: result.secure_url },
          { new: true }
        );
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};