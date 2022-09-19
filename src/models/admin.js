const mongoose = require("mongoose");
var crypto = require("crypto");
const user = require("./User");
const AdminSchema = new mongoose.Schema({
  walletPubKey: {
    type: String,
    required: true,
    unique: true,
  },
  walletHash: String,

  walletSalt: String,
});

var Admin = user.discriminator("Admin", AdminSchema);

if (mongoose.models.Admin) {
  Admin = mongoose.model("Admin");
} else {
  Admin = mongoose.model("Admin", AdminSchema);
}

module.exports = Admin;
