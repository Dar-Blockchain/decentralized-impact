const seance = require("../models/seance");


//--------------------------ajouter une seance ---------------------------//
exports.add =(req,res)=>{
    let newSeance = new seance(); 
  
    // Initialize newUser object with request data 
    newSeance.date = req.body.date, 
    newSeance.url = req.body.url, 
  
  
    newSeance.dure = req.body.dure,
  
  
    newSeance.project=req.body.project,
    newSeance.expert=req.body.expert,

    
  
                   
  
    newSeance.save((err,newSeance)=>{
      if(err){
        return res.status(400).json({
          error:"unable to add session"
        })
      }
      return res.json({
        message: "sucsess",
        newSeance
      })
    })
  }
  //--------------------------afficher tous les seances  ---------------------------//
  exports.show =(req,res)=> {
    seance.find().then(
      (seance) => {
        res.status(200).json(seance);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: "no session"
        });
      }
    );
  };
  //-------------------------afficher seance par id -------------------------------------//
  exports.details =(req,res)=> {
    seance.findOne({
      _id: req.params.id
    }).then(
      (seance) => {
        res.status(200).json(seance);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  //---------------------------modifier seance -------------------------------------------//
  exports.update =(req,res)=>{
    seance.findByIdAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'seance modifié !'}))
    .catch(error => res.status(400).json({ error }));
};
//------------------------------delete seance---------------------------------------------//
exports.deleted=(req,res)=>{
  seance.findByIdAndDelete({_id: req.params.id})
  .then(() => res.status(200).json({ message: 'seance supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}
  