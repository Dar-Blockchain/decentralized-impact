const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
  
    wallet: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
    }
})
var Admin = User.discriminator("Admin",AdminSchema);

module.exports = Admin = mongoose.model("admin", AdminSchema);