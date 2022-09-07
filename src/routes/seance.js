const express = require("express");
const {
  add,
  show,
  details,
  update,
  deleted,
} = require("../controllers/seance");
const { check } = require("express-validator");
const { sign } = require("crypto");
const router = express.Router();

router.post("/add", add);
router.get("/show", show);
router.get("/details/:id", details);
router.post("/update/:id", update);
router.get("/delete/:id", deleted);

module.exports = router;
