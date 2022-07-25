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
var holder;

if (mongoose.models.holder) {
  holder = mongoose.model('holder');
} else {
  holder = mongoose.model('holder', holderSchema);
}

module.exports = holder;