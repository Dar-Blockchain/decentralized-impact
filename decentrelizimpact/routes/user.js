const express = require("express")
const { signup , signin, signout,profile} = require("../controllers/user")
const {check} = require('express-validator')
const { sign } = require("crypto")
const router = express.Router()
router.post('/signup',[
    check("name",",name atleat should be 3 charachters").isLength({min:3})
],signup)

router.post('/signin', signin)
router.post('/profile')
router.get('/signout',signout)
 


module.exports = router