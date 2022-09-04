var express = require("express");
const Project = require("../models/project");
var router = express.Router();
//const multer = require("multer");

/*const Storage = multer.diskStorage({
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
        if(!file.originalname.match(/\.(pdf|text)$/)) 
        {
            return cb(new  Error('this is not the correct format of file'));
        }
        cb(undefined,true)
    }
});*/
exports.getAllProjects = (req, res) => {
  Project.find({}).then((project) => {
    if (!project) {
      res.status(400).send({
        message: "no projects found",
        value: project,
      });
    } else {
      res.status(200).send({
        message: "Project found",
        value: project,
      });
    }
  });
};

exports.addProject = (req, res) => {
  let newProject = new Project({
    ...req.body,
  });

  newProject
    .save()
    .then(() => {
      res.status(201).json({ message: "object created" });
    })
    .catch((error) => res.status(400).json({ error }));
};
/*
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
});*/
exports.getProjectById = (req, res) => {
  Project.findOne({ _id: req.params.id }).then((project) => {
    if (!project) {
      return res
        .status(400)
        .json({ message: "project not found", value: project });
    } else {
      return res.status(200).json({ message: "project found", value: project });
    }
  });
};
exports.getProjectByTitre = (req, res) => {
  Project.findOne({ _title: req.params.title }).then((project) => {
    if (!project) {
      return res.status(400).send("project not found");
    } else
      return res.status(200).send({ message: "project found", value: project });
  });
};
exports.update = (req, res) => {
  Project.findOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "project modified " }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleted = (req, res) => {
  Project.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "project deleted " }))
    .catch((error) => res.status(400).json({ error }));
};
