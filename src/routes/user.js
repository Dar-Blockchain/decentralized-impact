const express = require("express");
const userController = require("../controllers/user");
const multer = require('../middlewares/multer-config')
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
  forgotPassword,
  resetPassword,
<<<<<<< HEAD
  updateProfile
=======
>>>>>>> ca998f7987e5b06467a3dd76941eb796128f2a4e
} = require("../controllers/user");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/profile");
router.get("/signout", userController.signout);
router.get("/userByUserType/:userType", userController.userByUserType);
router.get("/", auth, userController.getUsers);
router.get("/:id/verify/:token", Token);



router.post("/make/admin/:id", userController.makeAdmin);
router.post("/make/expert/:id", userController.makeExpert);
router.post("/make/communityMember/:id", userController.makeCommunityMember);
<<<<<<< HEAD
router.post('/forgot-password',forgotPassword);
router.post('/:id/reset-password/:token',resetPassword);
router.put("/updateProfile/:id", updateProfile);
=======
router.post("/forgot-password", forgotPassword);
router.post("/:id/reset-password/:token", resetPassword);
>>>>>>> ca998f7987e5b06467a3dd76941eb796128f2a4e

module.exports = router;
