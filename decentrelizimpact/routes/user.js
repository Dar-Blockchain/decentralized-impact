const express = require("express")
const { signup , signin, signout,profile} = require("../controllers/user")
const {check} = require('express-validator')
const { sign } = require("crypto")
const router = express.Router()
router.post('/signup',[
    check("name",",name atleat should be 3 charachters").isLength({min:3})
],signup)

<<<<<<< HEAD
router.post('/signup', signup);
router.post('/profile')
router.get('/signout',signout)
//router.get('/api/users/confirm/:token', confirmationPost)
=======
router.post('/signin', signin)
router.post('/profile')
router.get('/signout',signout)
>>>>>>> 921fc525d954cacd99808f06d22eeb3d813ff69c
 


module.exports = router