const User = require("../models/User");
const community = require("../models/community");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { body } = require("express-validator");
const Token = require("../models/Token");
const urll = "http://localhost:3000/api";
var aes256 = require("aes256");
const resetToken = require("../models/resetToken");

const sendEmail = require("../controllers/sendEmail");
const resetPassword = require("../controllers/resetPassword");
const { url } = require("inspector");
const Joi = require("joi");

const ethers = require("ethers");

const Wallet = require("../wallet");
require("dotenv").config();

function decrypt() {
  var decrypt = aes256.decrypt(key, wallet.privateKey);
  var decrypt = aes256.decrypt(key, wallet.mnemonic.phrase.toString());
  return decrypt;
}
//---------------------signup-------------------------------//
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
    const wallet = await Wallet.wallet();
    user = new User({ ...req.body });
    user.setPassword(req.body.password);
    const key = process.env.KEY;
    user.wallet.publicKey = wallet.address;
    user.wallet.privateKey = aes256.encrypt(key, wallet.privateKey);
    user.wallet.mnemonic = aes256.encrypt(
      key,
      wallet.mnemonic.phrase.toString()
    );
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
//---------------------signin-------------------------------//
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.password) && user.verified == true) {
        return res.json({
          token: jwt.sign(
            { email: user.email, firstName: user.firstName, _id: user._id },
            "RESTFULAPIs"
          ),
          user,
        });
      } else if (
        user.validPassword(req.body.password) &&
        user.verified == false
      ) {
        return res.status(400).send({
          message: "user not verified",
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password or user not verified",
        });
      }
    }
  });
};
//------------------------------forgot password------------------//
exports.forgotPassword = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email not Exist!" });

    /*const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);*/
    const token = await new resetToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${urll}/${user._id}/reset-password/${token.token}`;
    await resetPassword(user.email, "reset Password Email", url);
    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
//--------------------------reset password-----------------------//
exports.resetPassword = async (req, res) => {
  resetToken.findOne({ token: req.params.token }, function (err, token) {
    if (!token)
      return res.status(400).send({
        type: "not-exist",
        msg: `We were unable to find a valid token.Your token my have expired.`,
      });

    // If we found a token, find a matching user
    User.findOne({ _id: token.userId }, function (err, user) {
      if (!user)
        return res
          .status(400)
          .send({ msg: "We were unable to find a user for this token." });

      // Verify and save the user
      user.password = req.body.password;
      user.setPassword(req.body.password);

      user.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res.status(200).send("The password has been changed. Please login.");
      });
    });
  });
};
/*
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
    const hashPassword = await bcrypt.hash(req.body.password, salt);

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
*/
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

//--------------------------get users---------------------------//
exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      res.satus(400).json({ error });
    });
};
//-------------------------makeAdmin---------------------------//
exports.makeAdmin = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { userType: "Admin" } },
    { new: true, upsert: false }
  )
    .then((users) => {
      res.status(200).json({ users, message: "changed !" });
      console.log(user.userType);
    })
    .catch((error) => {
      res.satus(400).json({ error, message: "faild" });
    });
};
//-------------------------makeCommunityMember----------------//
exports.makeCommunityMember = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { userType: "Community" } },
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
//-------------------------MakeExpert--------------------------//
exports.makeExpert = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { userType: "Expert" } },
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

// ---------------get user by userType----------------//
exports.userByUserType = (req, res) => {
  User.find({ userType: req.params.userType }).then((User) => {
    if (!User) {
      return res.status(400).send("user not found");
    } else return res.status(200).send({ message: "users found", value: User });
  });
};
//--------------------------signout---------------------------//
exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.json({
    message: "user signout",
  });
};
//--------------------------updateProfile---------------------------//
exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      ...req.body,
      image: `${req.protocol}://${req.get("urll")}/images/${req.file.filename}`,
      _id: req.params.id,
    }
  )
    .then(() => res.status(200).json({ message: "account modified" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.findUserByEmail = (email) => {
  User.findOne({ email: email })
    .then((user) => {
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getHolderProject = async(req, res) =>{ 
  console.log(req.params,)
  const a = await User.findOne({ _id : req.params.id})
  .then((a) => { res.status(200).json({message: "done" ,value : a.projects})
  console.log(a.projects)

  })
}

// 6313aab62754f7fdf6e84bbe
