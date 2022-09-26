const express = require("express");
const {
  add,
  show,
  details,
  update,
  deleted,
  tokenExpert
} = require("../controllers/expert");
const { check } = require("express-validator");
const { sign } = require("crypto");
const router = express.Router();

router.post("/add", add);
router.get("/show", show);
router.get("/details/:id", details);
router.post("/update/:id", update);
router.get("/delete/:id", deleted);
router.post("/:id/signupExpert/:token", tokenExpert);

module.exports = router;
