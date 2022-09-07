const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  teamMemberEmails: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  descriptionFileUrl: {
    type: String,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Project", projectSchema);
