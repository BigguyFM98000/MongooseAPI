const User = require('../models/user_model');

const addGoogleUser =
  (User) =>
  ({ email, firstName, lastName, profileImage }) => {
    const user = new User({

      email,
      firstname,
      lastname,
      profileImage,
      source: "google",
    });

    return user.save();
  };

const getUsers = (User) => () => {
  return User.find({source: "google"});
};

const getUserByEmail =
  (User) =>
  async ({ email }) => {
    return await User.findOne({
      email,
    });
  };

module.exports = (User) => {
  return {
    addGoogleUser: addGoogleUser(User),
    getUsers: getUsers(User),
    getUserByEmail: getUserByEmail(User),
  };
};
