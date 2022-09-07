const mongoose = require("mongoose")

const holderSchema = new mongoose.Schema({
  
    wallet: {
        type: String,
        required: true,
    },
})
var Project_holder = User.discriminator("Project_holder",holderSchema);

module.exports = Project_holder = mongoose.model("Project_holder", holderSchema);