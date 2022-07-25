const mongoose = require("mongoose")

const CommunitySchema = new mongoose.Schema({
  
    wallet: {
        type: String,
        required: true,
    }
})

var Community = User.discriminator("Community",CommunitySchema);

module.exports = Community = mongoose.model("Community", CommunitySchema);