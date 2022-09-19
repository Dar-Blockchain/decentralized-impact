var express = require("express");
const Project = require("../models/project");
var router = express.Router();
const toCommunity = require("./user")

exports.getAllProjects = (req, res) => {
  Project.find({}).then((project) => {
    if (!project) {
      res.status(400).send({
        message: "no projects found",
        value: project,
      });
    } else {
      res.status(200).json({ project });
    }
  });
};

exports.addProject = (req, res) =>{
  let newProject = new Project({
    ...req.body,
  });

  newProject
    .save()
    .then(() => {
      toCommunity.makeCommunityMember(),
      res.status(201).json({ message: "object created" });
    })
    .catch((error) => res.status(400).json({ error }));
};
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

// Approve project
// TODO send an email to the user that says that his project has been confirmed
exports.approveProject = (req, res) => {
  Project.findOneAndUpdate({ _id: req.params.id }, { isConfirmed: true })
    .then(() => res.status(200).json({ message: "Project approved" }))
    .catch((error) => res.status(400).json({ error }));
};

// Decline project
// TODO send an email to the user that says that his project has been declined
exports.declineProject = (req, res) => {
  Project.findOneAndDelete({ _id: req.params.id })
    .then(() =>
      res.status(200).json({ message: "Project declined and deleted" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllUnconfirmedProjects = (req, res) => {
  Project.find({ isConfirmed: false })
    .then((projects) => res.status(200).json({ projects }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllConfirmedProjects = (req, res) => {
  Project.find({ isConfirmed: true })
    .then((projects) => res.status(200).json({ projects }))
    .catch((error) => res.status(400).json({ error }));
};