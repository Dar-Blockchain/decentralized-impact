var express = require('express');
var projectManaggement = require('../utils/projects.js');
var router = express.Router();
const multer = require('multer');

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req,file,cb) =>{
        cb(null,file.originalname);
    }
});
const avatar  = multer({
    storage: Storage,
    limits: {
        fileSize: 2000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/)) 
        {
            return cb(new  Error('this is not the correct format of file'));
        }
        cb(undefined,true)
    }
});
router.get('/',async(req,res) =>{
    const projMgt = new projectManaggement();
    projMgt.getAllprojects().then((resp) =>{
        if(!resp){
            res.status(400).send({
                message: "no projects found",
                value: resp,
            })
        }else {
            res.status(200).send({
                message: "users found",
                value: resp,
            });
        }
    });
});

router.post('/',async(req,res) =>{
    const projMgt  = new projectManaggement();
    // const photo = req.file.buffer;
    const titre = req.body.titre;
    const porteur = req.body.porteur;
    const description = req.body.description;
    const maxcap = req.body.maxcap;
    const delay = req.body.delay;
    const category = req.body.category;
    projMgt.addProject(titre,porteur,description,maxcap,delay,category,"photo")
    .then((resp) =>{
        if(!resp) {
            return res.status(400).send({
                message: "project name exists",
                value: resp
            });
        }else {
            return res.status(201).send({
                message: "project has been createdd",
                value: resp,
            });
        }
    });
});
router.post('/uploadPhotos/:id',avatar.single('upload'),async(req,res) =>{
    const photo = req.file.buffer;
    const id = req.params.id;
    const projMgt  = new projectManaggement();
    projMgt.addPhoto(id,photo).then((resp) =>{
        if(resp == null){
            res.status(404).send("project not found");
        }
        else if(!resp) {
            return res.status(400).send( {
                message : "project not found",
                value: resp
            });
        }
        else {
            return res.status(200).send({message :" upload photos succeed ", value: resp});
        }
    });
});
router.get('/:id',async(req,res) =>{
    const projMgt = new projectManaggement();
    projMgt.getProjectById(req.params.id).then((resp) =>{
        if(!resp){
            return res.status(400).status({message: "project not found", value: resp});
        }
        else {
            return res.status(200).send({message: "project found", value: resp});
        }
    });
});
router.get('/geybytitre/:titre', async(req,res) =>{
    const projMgt = new projectManaggement();
    projMgt.getProjectByTitre(req.params.titre).then((resp)=>{
        if(!resp){
            return res.status(400).send("project not found");
        }
        else return res.status(200).send({message:"project found", value : resp});
    });
});
router.get('/getbycategory/:category', async(req,res) =>{
    const projMgt = new projectManaggement();
    projMgt.getProjectByCategory(req.params.category).then((resp) =>{
        if(resp == null){
            return res.status(404).send("wrong category");
        }else if (!resp){
            return res.status(400).send("no projects in this category");
        }
        else {
            return res.status(200).send({message: "projects found", value : resp});
        }
    });
});
router.put('/:id',async(req,res) =>{
    const projMgt = new projectManaggement();
    const id = req.params.id;
    const titre = req.body.titre;
    const description = req.body.description;
    const maxcap = req.body.maxcap;
    const delay  = req.body.delay;
    const category = req.body.category;
    projMgt.updateProject(id,titre,description,maxcap, delay,category).then((resp) =>{
        if(resp == null) {
            return res.status(404).send("unknown project");
        }else if (!resp){
            return res.status(400).send({message:"update failed",value: resp});
        }
        else {
            return res.status(200).send({message: "update done", value: resp});
        }
    });
});
router.delete('/:id',async(req,res) =>{
    const projMgt = new projectManaggement();
    projMgt.deleteProjectById(req.params.id).then((resp) =>{
        if(!resp) {
            return res.status(400).send("delete failed");        
        }else {
            return res.status(200).send({message: "project deleted",value: resp});
        }
    });


})
module.exports = router;