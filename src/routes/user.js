const express = require("express");
const userController = require("../controllers/user");
const { check } = require("express-validator");
const { sign } = require("crypto");
const auth = require("../middlewares/auth");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  profile,
  Token,
} = require("../controllers/user");

const {
  signup,
  signin,
  signout,
  profile,
  Token,
  forgotPassword,
  resetPassword,
} = require("../controllers/user");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/profile");
router.get("/signout", userController.signout);
router.get("/", auth, userController.getUsers);
router.get("/:id/verify/:token", Token);
router.post("/make/admin/:id", userController.makeAdmin);
router.post("/make/communityMember/:id", userController.makeCommunityMember);
router.post("/forgot-password", forgotPassword);
router.post("/:id/reset-password/:token", resetPassword);

module.exports = router;
