var holderManagement = require('../utils/project_holders.js');
var express = require('express');

const jwt = require("jsonwebtoken");
var router = express.Router();

router.get('/login',async(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const porteurMgt = new holderManagement();
    porteurMgt.validatePasswordByEmail(email,password)
    .then((resp) =>{
        if(resp === null ){
            res.status(404).send({
                message : "email not found",
                value : resp,
            });
        }else if (resp){
            const payload = {
                "email": email,
                "role": "PorteurProject",
            };
            jwt.sign(payload, "secret",{expiresIn:'12h'},(err,token)=>{
                if(err) {
                    res.status(403).send({message: "an error occured"});
                }else {
                    res.status(200).send({token: token});
                }
            })
        }
    })
})
router.get('/', async (req,res) =>{
    const porteurMgt = new holderManagement();
    porteurMgt.getAllPorteurs().then((resp) => {
        if(!resp){
            res.status(400).send({message: "no users in db" });
        }else{
            res.status(200).send({
                message: "users found",
                value: resp,
            });
        }
    });
});
router.get('/:id', async (req,res) =>{
    const porteurMgt = new holderManagement();
    porteurMgt.getPorteurById(req.params.id)
    .then((resp) =>{
        if (!resp){
            res.status(400).send({
                message: "user not found",
                value: resp,
            });
        }
        else{
           
            res.status(200).send({
                message: "user found",
                value: resp,
            });
        }
    });
});
router.get('/getbyemail/:email',async(req,res) =>{
    const porteurMgt = new holderManagement();
    porteurMgt.getPorteurByEmail(req.params.email)
    .then((resp) =>{
        if(!resp){
            res.status(400).send({
                message: "user not found",
                value: resp,
            });
        }else{
            res.status(200).send({
                message: "user found",
                value: resp,
            });
        }
    });
});
router.get('/getbywallet/:wallet',async(req,res) =>{
    const porteurMgt = new holderManagement();
    porteurMgt.getPorteurByWallet(req.body.wallet)
    .then((resp) =>{
        if(!resp){
            res.status(400).send({
                message: "user not found",
                value: resp,
            });
        }else{
            res.status(200).send({
                message: "user found",
                value: resp,
            });
        }
    });
});
router.post('/',async(req,res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const gouvernorat = req.body.gouvernorat;
    const city = req.body.city;
    const walletPubKey = req.body.walletPubKey;
    const walletPrivKey = req.body.walletPrivKey;
    const telephone = req.body.telephone;
    const porteurMgt = new holderManagement();
    porteurMgt.addPorteurProj(
        name,
        email,
        password,
        address,
        gouvernorat,
        city,
        walletPubKey,
        walletPrivKey,
        telephone)
        .then((resp) =>{
            if(!resp){
                res.status(400).send({
                    message: "Porteur porjet exist",
                    value: resp,
                });
            }else{
                res.status(201).send( {
                    message: "porteur projet created",
                    value: resp,
                });
            }
        });
});
router.delete('/:id',async (req,res) =>{
    const porteurMgt = new holderManagement();
    porteurMgt.deletePorteurById(req.params.id)
    .then((resp) =>{
        if(!resp){
            res.status(400).send({
                message: "delete failed",
                value: resp,
            });
        }else{
            res.status(200).send({
                message: "delete succeed",
                value: resp,
            });
        }
    });
});
router.delete('/deletebyemail/:email', async (req,res) =>{
    const porteurMgt = new holderManagement();
    porteurMgt.deletePorteurByEmail(req.params.email)
    .then((resp) =>{
        if(!resp){
            res.status(400).send({
                message: "delete failed",
                value: resp,
            });
        }else {
            res.status(200).send({
                message: "delete succeed",
                value: resp,
            });
        }
    });
});
router.put('/:id', async(req,res) =>{
    const porteurMgt = new holderManagement();
    const id= req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const gouvernorat = req.body.gouvernorat;
    const city = req.body.city;
    const telephone = req.body.telephone;
    porteurMgt.updatePorteurPrById(
        id,
        name,
        email,
        address,
        gouvernorat,
        city,
        telephone)
        .then((resp) =>{
            if(resp === null) {
                res.status(404).send({
                    message: "porteur project not found",
                    value: resp,
                });
            }else if (!resp){
                res.status(400).send({
                    message: "update failed",
                    value: resp,
                });
            }
            else {
                res.status(200).send({
                    message :"update done",
                    value : resp,
                });
            }
        });
});

router.put('/updatebyemail/:email', async(req,res) =>{
    const porteurMgt = new holderManagement();
    const currentEmail= req.params.email;
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const gouvernorat = req.body.gouvernorat;
    const city = req.body.city;
    const telephone = req.body.telephone;
    porteurMgt.updatePorteurPrByEmail(
        currentEmail,
        name,
        email,
        address,
        gouvernorat,
        city,
        telephone)
        .then((resp) =>{
            if(resp === null) {
                res.status(404).send({
                    message: "porteur project not found",
                    value: resp,
                });
            }else if (!resp){
                res.status(400).send({
                    message: "update failed",
                    value: resp,
                });
            }
            else {
                res.status(200).send({
                    message :"update done",
                    value : resp,
                });
            }
        });
});
router.put('/resetpassword/:id',async(req,res) =>{
    const porteurMgt = new holderManagement();
    const id= req.params.id;
    const currentpassword = req.body.currentpassword;
    const confirmpassword = req.body.confirmpassword;
  
    const newpassword = req.body.newpassword;
    const confirmnewpassword = req.body.confirmnewpassword;
    
    if((currentpassword == confirmpassword ) && ( newpassword == confirmnewpassword )){
        porteurMgt.resetPassword(id,newpassword)
        .then((resp) =>{
            if(resp == null){
                res.status(400).send({
                    message:" user not found",
                });
            }else if (resp){
                res.status(200).send({
                    message: "password has been update",
                });
            }else {
                res.status(401).send({
                    message: "password is the same thanks to put a new one",
                });
            }
        });
    }
});

module.exports = router;