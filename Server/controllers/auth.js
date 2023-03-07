const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const configData = require('../configs/db_config')
const {createJWT} = require("./jwt_token");

exports.signup = (req, res, next) => {
  let { firstname, lastname, email, password, password_confirmation } =
    req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: "email already exists" }] });
      } else {
        const user = new User({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;
            user.save().then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              }).catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
      }
    }).catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};

exports.signin = async (req, res) => {
  let { email, password } = req.body;

  const user = await User.findOne({ email: email })

  try{
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "not found" }],
        });
      } else {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({ errors: [{ password: "incorrect" }] });
          }
            let access_token = createJWT(user.email, user._id, 3600);
            jwt.verify(
                access_token,
                configData.Token_secret,
              (err) => {
                if (err) {
                  res.status(400).json({ erros: err });
                }
              
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    message: user,
                  });

              }
            );
          })
      }
    }catch(err){
      res.status(500).json({
        errors: [{ error: err }],
      });
    }



};
