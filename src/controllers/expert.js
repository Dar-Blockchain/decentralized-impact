<<<<<<< HEAD
const expert = require("../models/expert");
const expertToken = require("../models/expertToken");
const { url } = require("inspector");
const inviteExpert = require("./inviteExpert");
const urll = "http://localhost:5000/expert";

const crypto = require("crypto");


//--------------------------ajouter une expert ---------------------------//
/*exports.add = (req, res) => {
  let newExpert = new expert({
    ...req.body,
  });
=======
const Expert = require("../models/expert");
const User = require("../models/User")
//--------------------------ajouter une expert ---------------------------//
exports.add = (req, res) => {
  let newexpert = new Expert({ ...req.body });
>>>>>>> ca998f7987e5b06467a3dd76941eb796128f2a4e

  newExpert
    .save()
    .then(() => {
      res.status(201).json({ message: "newExpert created" });
    })
    .catch((error) => res.status(400).json({ error }));
};*/
//------------------------create an expert------------------//
exports.add = async (req, res) => {
  try {
    let Newexpert = await expert.findOne(
      ({ firstName, lastName, email, password } = req.body)
    );
    if (Newexpert)
      return res
        .status(409)
        .send({ message: "Expert with given email already Exist!" });

    /*const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);*/

    Newexpert = new expert({ ...req.body });
    Newexpert.firstName = "still waiting";  
    Newexpert.lastName= "still waiting";  
     
    
   
    Newexpert.generatePassword (req.body.password);
    await Newexpert.save();
    const token = await new expertToken({
      userId: Newexpert._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${urll}/${Newexpert._id}/signupExpert/${token.token}`;
    await inviteExpert(Newexpert.email, "signup as an Expert", url);
    res
      .status(201)
      .send({ message: "An Email sent to an expert account " });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//--------------------------afficher tous les expert  ---------------------------//
exports.tokenExpert = async (req, res) => {
  expertToken.findOne({ token: req.params.token }, function (err, token) {
    if (!token)
      return res.status(400).send({
        type: "not-exist",
        msg: `We were unable to find a valid token.Your token my have expired.`,
      });

    // If we found a token, find a matching user
    expert.findOne({ _id: token.userId }, function (err, Expert) {
      if (!Expert)
        return res
          .status(400)
          .send({ msg: "We were unable to find a user for this token." });
     

      // Verify and save the user
      
      Expert.password = req.body.password;
      Expert.setPassword(req.body.password);
      Expert.firstName=req.body.firstName;
      Expert.lastName=req.body.lastName;
      Expert.verified = true;  
     
    
      Expert.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res.status(200).send("your account is valid. Please login.");
      });
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
