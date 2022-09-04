const express = require("express")
const {check} = require('express-validator')
const router = express.Router()
const projectControleur = require("../controllers/project.js")


router.post('/addProject', projectControleur.addProject)
router.get('/getprojects', projectControleur.getAllProjects)
router.get('/getprojectbyid/:id', projectControleur.getProjectById)
router.get('/getprojectbytitle/:title', projectControleur.getProjectByTitre)
router.post('/update/:id', projectControleur.update)
router.post('/delete/:id', projectControleur.deleted)


module.exports = router