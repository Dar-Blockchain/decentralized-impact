const mongoose = require("mongoose");
var crypto = require("crypto");
const user = require("./User");
const expertSchema = new mongoose.Schema({
  walletPubKey: {
    type: String,
    required: true,
    unique: true,
  },
  
  walletHash: String,

  walletSalt: String,
});

var Expert = user.discriminator("Expert", expertSchema);

if (mongoose.models.Expert) {
  Expert = mongoose.model("Expert");
} else {
  Expert = mongoose.model("Expert", expertSchema);
}

module.exports = Expert;
