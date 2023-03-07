const jwt = require("jsonwebtoken");
const configData = require('../configs/db_config')

exports.createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, configData.Token_secret, {
     expiresIn: duration,
   });
};