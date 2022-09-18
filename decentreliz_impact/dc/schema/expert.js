const mongoose = require("mongoose")

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
        type: int,
        required: true,
    },
    Rating: {
        type: int,
        required: true,
    }
})

var Expert = User.discriminator("Expert",expertSchema);

module.exports = Expert = mongoose.model("Expert", expertSchema);