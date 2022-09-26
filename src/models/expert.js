const mongoose = require("mongoose");
var crypto = require("crypto");
const user = require("./User");
const expertSchema = new mongoose.Schema({
<<<<<<< HEAD
  walletPubKey: {
    type: String,
    required: true,
    unique: true,
  },
  
  walletHash: String,

  walletSalt: String,
=======
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
  }
>>>>>>> ca998f7987e5b06467a3dd76941eb796128f2a4e
});

var Expert = user.discriminator("Expert", expertSchema);

if (mongoose.models.Expert) {
  Expert = mongoose.model("Expert");
} else {
  Expert = mongoose.model("Expert", expertSchema);
}

<<<<<<< HEAD
module.exports = Expert;
=======
module.exports = Expert;
>>>>>>> ca998f7987e5b06467a3dd76941eb796128f2a4e
