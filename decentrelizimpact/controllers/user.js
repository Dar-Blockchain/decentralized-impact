const User = require("../models/User");
const bcrypt = require("bcryptjs");
//const { user } = require("../routes/user")
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { body } = require("express-validator");

//---------------------signUp-------------------------------//
exports.signup = (req, res) => {
  // Initialize newUser object with request data
  let newUser = new User({
    ...req.body,
  });

  // Call setPassword function to hash password
  newUser.setPassword(req.body.password);

  newUser.save((err, newUser) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    return res.json({
      message: "sucsess",
      newUser,
    });
  });
};
//---------------------signin-------------------------------//
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.password)) {
        return res.json({
          token: jwt.sign(
            { email: user.email, firstName: user.firstName, _id: user._id },
            "RESTFULAPIs"
          ),
          user,
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  });
};
//--------------------------signout---------------------------//
exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.json({
    message: "user signout",
  });
};

exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      res.satus(400).json({ error });
    });
};
