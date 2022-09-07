const express = require("express");
const userController = require("../controllers/user");
const { check } = require("express-validator");
const { sign } = require("crypto");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/profile");
router.get("/signout", userController.signout);
router.get("/", userController.getUsers);

module.exports = router;
