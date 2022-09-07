const mongoose = require("mongoose");

const seanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  dure: {
    //type: TimeRanges,
    type: String,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    //type : String,
  },
  expert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expert",
    //type : String,
  },
});

module.exports = mongoose.model("Seance", seanceSchema);
