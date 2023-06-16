const User = require("../models/user_model");
const UserService = require("../server_functions/signin_using_google");

module.exports = UserService(User);
