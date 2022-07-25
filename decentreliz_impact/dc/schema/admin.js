const mongoose = require("mongoose")
var crypto = require('crypto');
const AdminSchema = new mongoose.Schema({
  
    walletPubKey: {
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: String,
        required: true,
    },

    walletHash: String,
    
    walletSalt: String,
})

AdminSchema.methods.setWallet = function(wallet){
    this.walletSalt = crypto.randomBytes(16).toString(`hex`);
    this.walletHash = crypto.pbkdf2Sync(wallet,this.walletSalt,1000,64,`sha512`).toString(`hex`);
 };
 AdminSchema.methods.validWallet = function(wallet){
    var walletHash = crypto.pbkdf2Sync(wallet,  
        this.walletSalt, 1000, 64, `sha512`).toString(`hex`); 
        return this.walletHash === walletHash; 
 };

var Admin = User.discriminator("Admin",AdminSchema);

module.exports = Admin = mongoose.model("admin", AdminSchema);