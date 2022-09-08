const mongoose = require("mongoose");
const User = require("../models/User");

const expertSchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: true,
  },

  domain: {
    type: String,
    required: true,
  },

  hourRate: {
    type: Number,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
});

var Expert = User.discriminator("Expert", expertSchema);

if (mongoose.models.Expert) {
  Expert = mongoose.model("Expert");
} else {
  Expert = mongoose.model("Expert", expertSchema);
}

