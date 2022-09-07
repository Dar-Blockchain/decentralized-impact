const expert = require("../models/expert");

//--------------------------ajouter une expert ---------------------------//
exports.add = (req, res) => {
  let newexpert = new expert({ ...req.body });

  // Initialize newUser object with request data

  newexpert.save((err, newexpert) => {
    if (err) {
      return res.status(400).json({
        error: "unable to add expert",
      });
    }
    return res.json({
      message: "sucsess",
      newexpert,
    });
  });
};
//--------------------------afficher tous les expert  ---------------------------//
exports.show = (req, res) => {
  expert
    .find()
    .then((expert) => {
      res.status(200).json(expert);
    })
    .catch((error) => {
      res.status(400).json({
        error: "no session",
      });
    });
};
//-------------------------afficher expert par id -------------------------------------//
exports.details = (req, res) => {
  expert
    .findOne({
      _id: req.params.id,
    })
    .then((expert) => {
      res.status(200).json(expert);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
//---------------------------modifier expert -------------------------------------------//
exports.update = (req, res) => {
  expert
    .findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    )
    .then(() => res.status(200).json({ message: "expert modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};
//------------------------------delete expert---------------------------------------------//
exports.deleted = (req, res) => {
  expert
    .findByIdAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "expert supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
