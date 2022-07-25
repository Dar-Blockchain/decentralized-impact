var express = require('express');
var superAdminManagement = require('../utils/admins.js');
const jwt = require("jsonwebtoken");
const isAuthenticated = require('../utils/isAuthenticated');
var router = express.Router();


router.get('/login',async (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const adminmgt = new superAdminManagement();
    adminmgt.validatePasswordByEmail(email,password).then((resp)=> {
        if(resp === null ){
            res.status(404).send({
                message: "email not found",
                value: resp,
            });
        }
        else if (resp){
            const payload = {
                "email": email,
                "admin": true
            };
            jwt.sign(payload,"secret",{expiresIn:'12h'},(err,token) =>{
                if(err){
                    res.status(403).send({message: "an error in login"})
                }
                else{
                    res.status(200).send({token: token});
                }
            });
        }
        else{
            res.status(400).send({
                message: "wrong password check again",
                value: resp
            });
        }
    })
});
router.post('/',isAuthenticated,function(req,res){
    const adminmgt = new superAdminManagement();
    const nom = req.body.nom;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const position = req.body.position;
    const telephone = req.body.telephone;
    adminmgt.addAdmin(nom,email,password,address,position,telephone).then((resp) =>{
        if(!resp){
            res.status(400).send({
                message: "admin does exist",
                value: resp
            });
        }
        else{
            res.status(201).send({
                message: "admin created",
                value: resp
            });
        }
    })
})

router.get('/',isAuthenticated,function(req,res){
    const adminmgt = new superAdminManagement();
    adminmgt.getAllAdmins().then((resp) =>{
        if(!resp){
            res.status(400).send({
                message: "no admins",
                value: resp
            });
        }else{
            res.status(200).send(resp);
        }
    });
});
router.get('/:id',isAuthenticated,function(req,res){
    const id = req.params.id
    const adminmgt = new superAdminManagement();
    adminmgt.getAdminById(id).then((resp) => {
        if(resp === false){
            res.status(400).send({
                message: "admin not found",
                value: resp
            });
        }
        else{
            res.status(200).send({
                message: "user found",
                value: resp
            });
        }
    });
});
router.get('/getbyemail',isAuthenticated, function(req,res){
    const email = req.params.email;
    const adminmgt = new superAdminManagement();
    adminmgt.getAdminbyEmail(email).then((resp) =>{
        if(!resp){
            res.status(400).send({
                message: "admin not found"
            })
        }
    });
});
router.put('/:id',isAuthenticated,function(req, res){
    const name = req.body.nom;
    const email = req.body.email;
    const address = req.body.address;
    const position = req.body.position;
    const telephone = req.body.telepone;
    const id = req.params.id;
    const adminmgt = new superAdminManagement();
    adminmgt.updateById(id,name,email,address,position,telephone).then((resp) =>{
        if(resp == null){
            res.status(404).send({
                message: "admin not found",
                value: resp,
            });
            
            
        }else if(!resp){
            res.status(400).send({
                message: "update not possible",
                value: resp,
            });
            
        }
        else{
            res.status(200).send({
                message: "update done",
                value: resp,
            });
            
        }
    });
});

router.put('/updatebyemail/:email',isAuthenticated,function(req, res){
    const name = req.body.nom;
    const email = req.body.email;
    const address = req.body.address;
    const position = req.body.position;
    const telephone = req.body.telepone;
    const currentEmail = req.params.email;
    const adminmgt = new superAdminManagement();
    adminmgt.updateByEmail(currentEmail,name,email,address,position,telephone).then((resp) =>{
        if(resp == null){
            res.status(404).send({
                message: "admin not found",
                value: resp,
            });
            
            
        }else if(!resp){
            res.status(400).send({
                message: "update not possible",
                value: resp,
            });
            
        }
        else{
            res.status(200).send({
                message: "update done",
                value: resp,
            });
            
        }
    });
});


router.delete('/:id',isAuthenticated,function(req,res){
    const id = req.params.id;
    const adminmgt = new superAdminManagement();
    adminmgt.deleteById(id).then((resp)=>{
        if (!resp){
            res.status(400).send({message:"delete failed",value:resp});
        }
        else{
            res.status(200).send({message:"delete success",value: resp});
        }
    });
});
router.delete('/deletebyemail/:email',isAuthenticated,function(req,res){
    const email = req.params.email;
    const adminmgt = new superAdminManagement();
    adminmgt.deleteByEmail(email).then((resp) =>{
        if(!resp){
            res.status(400).send({message: "delete failed",value:resp});
        }
        else{
            res.status(200).send({message: "delete sucess",value: resp});
        }
    });
});
router.put('/resetpassword/:id',isAuthenticated,function (req,res){
    const id = req.params.id;
    const currentpassword = req.body.currentpassword;
    const confirmpassword = req.body.confirmpassword;
  
    const newpassword = req.body.newpassword;
    const confirmnewpassword = req.body.confirmnewpassword;
  
    if((currentpassword == confirmpassword ) && ( newpassword == confirmnewpassword )){
      usermgt = new superAdminManagement();
      usermgt.resetPasswordById(id,newpassword).then((resp)=>{
        console.log(resp);
        if(resp == null ){
          res.status(400).send({
            message: "user not found",
          });
        }
        else if(resp){
          res.status(200).send({
            message: "password has been updated",
            value: resp
          });
        }else{
          res.status(401).send({
            message: "password is the same thanks to put a new password",
            value: resp
          });
        }
      });
    }else{
      res.status(403).send({
        message: "wrong password confirmation",
      })
  }
  });
  

module.exports = router;