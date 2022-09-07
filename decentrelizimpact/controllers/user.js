const User = require("../models/User");
const bcrypt = require("bcryptjs");
//const { user } = require("../routes/user")
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { body } = require("express-validator");

exports.signup = (req, res) => {
  console.log("Ejaaw");
  let newUser = new User();

  // Initialize newUser object with request data
  (newUser.firstName = req.body.firstName),
    (newUser.lastName = req.body.lastName),
    (newUser.email = req.body.email),
    (newUser.password = req.body.password);

  console.log(newUser);
  // Call setPassword function to hash password
  newUser.setPassword(req.body.password);

  newUser.save((err, newUser) => {
    if (err) {
      return res.status(400).json({
        error: "unable to add user",
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
