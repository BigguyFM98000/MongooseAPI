const GoogleModel = require("../models/google_user_model");
require('dotenv').config();
require('dotenv').config();

exports.google_signin = async (req, res) => {
    let { email } = req.body;
    const google_user = await GoogleModel.findOne({ email: email });
    try{
        if (!google_user) {
          return res.status(404).json({
            errors: [{ google_user: "Google email not found" }],
          });
        } else {
            const google_user = new GoogleModel({
                given_name: given_name,
                family_name: family_name,
                picture: profile_picture,
                email: email,
              });
              google_user.save().then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              }).catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
            }
      }catch(err){
        res.status(500).json({
          errors: [{ error: err }],
        });
      }
  };