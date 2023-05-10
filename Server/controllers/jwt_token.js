const jwt = require("jsonwebtoken");
const configData = require('../configs/db_config')
require('dotenv').config();


exports.createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
};