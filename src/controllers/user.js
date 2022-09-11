const User = require("../models/User");
const community = require("../models/community");
const bcrypt = require("bcryptjs");
//const { user } = require("./src/routes/user")
const crypto = require("crypto");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { body } = require("express-validator");
const Token = require("../models/Token");
const sendEmail = require("../controllers/sendEmail");
const { url } = require("inspector");
const urll = "http://localhost:5000/api";

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
  let today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  User.findOne({ email: req.body.email }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      if (user.verified && user.validPassword(req.body.password)) {
        return res.json({
          token: jwt.sign(
            {
              email: user.email,
              firstName: user.firstName,
              _id: user._id,
              exp: parseInt(exp.getTime() / 1000),
            },
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

exports.signup = async (req, res) => {
  try {
    let user = await User.findOne(
      ({ firstName, lastName, email, password } = req.body)
    );
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    /*const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);*/

    user = new User({ ...req.body });
    user.setPassword(req.body.password);
    await user.save();
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${urll}/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);
    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//---------------------signin-------------------------------//
//----------------------verify-------------------------------//
exports.Token = async (req, res) => {
  // Find a matching token
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token)
      return res.status(400).send({
        type: "not-verified",
        msg: `We were unable to find a valid token.Your token my have expired.`,
      });

    // If we found a token, find a matching user
    User.findOne({ _id: token.userId }, function (err, user) {
      if (!user)
        return res
          .status(400)
          .send({ msg: "We were unable to find a user for this token." });
      if (user.verified)
        return res.status(400).send({
          type: "already-verified",
          msg: "This user has already been verified.",
        });

      // Verify and save the user
      user.verified = true;
      user.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res.status(200).send("The account has been verified. Please login.");
      });
    });
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

exports.makeAdmin = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { userType: "Admin", wallet: "0x0001" } },
    { new: true, upsert: false }
  )
    .then((users) => {
      res.status(200).json({ users, message: "changed !" });
    })
    .catch((error) => {
      res.satus(400).json({ error });
    });
};

exports.makeCommunityMember = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { userType: "Community", wallet: "0x01" } },
    { new: true, upsert: false }
  )
    .then((user) => {
      res.status(200).json({ user });
      console.log(user.userType);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// 6313aab62754f7fdf6e84bbe
