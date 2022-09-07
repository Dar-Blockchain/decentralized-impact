const Admin = require("../models/admin");

exports.addAdmin = (req, res) => {
  let newAdmin = new Admin({
    ...req.body,
  });

  newAdmin
    .save()
    .then(() => {
      res.status(201).json({ message: "Admin created" });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllAdmins = (req, res) => {
  Admin.find()
    .then((admin) => {
      res.status(200).json({ massage: "sucsses", admin });
    })
    .catch((error) => {
      res.status(400).json({
        error: "Admin dosen't exist",
      });
    });
};
exports.getAdminById = (req, res) => {
  Admin.findById({
    _id: req.params.id,
  })
    .then((admin) => {
      res.status(200).json({ message: "sucess", admin });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
exports.getAdminByEmail = (req, res) => {
  Admin.findOne({ _email: req.params.email }).then((admin) => {
    if (!admin) {
      return res.status(400).send("admin not found");
    } else
      return res.status(200).send({ message: "admin found", value: admin });
  });
};
exports.update = (req, res) => {
  Admin.findOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "admin modified " }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleted = (req, res) => {
  Admin.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Admin deleted " }))
    .catch((error) => res.status(400).json({ error }));
};
