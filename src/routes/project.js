const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const projectControleur = require("../controllers/project.js");

router.post("/addProject", projectControleur.addProject);
router.post("/addProject/test", projectControleur.addProject2);
router.get("/getprojects", projectControleur.getAllProjects);
router.get("/getprojectbyid/:id", projectControleur.getProjectById);
router.get("/getprojectbytitle/:title", projectControleur.getProjectByTitre);
router.post("/update/:id", projectControleur.update);
router.post("/delete/:id", projectControleur.deleted);
router.post("/approve/:id", projectControleur.approveProject);
router.post("/decline/:id", projectControleur.declineProject);
router.get("/unconfirmed", projectControleur.getAllUnconfirmedProjects);
router.get("/confirmed", projectControleur.getAllConfirmedProjects);
router.delete("/deleteAll", projectControleur.deleteAllProjects);

module.exports = router;
