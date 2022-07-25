const mongoose = require("mongoose")
const User = require("./User")
const holderSchema = new mongoose.Schema({
  
    wallet: {
        type: String,
        required: true,
    },
    project: {
        type: String,
        required: true,
    }
})
var holder = User.discriminator("holder",holderSchema);

module.exports = holder = mongoose.model("holder", holderSchema);