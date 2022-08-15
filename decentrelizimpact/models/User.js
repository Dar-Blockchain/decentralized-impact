const mongoose = require("mongoose")
const options = { discriminatorKey: 'itemtype' };
const crypto = require("crypto")
const UserSchema = new mongoose.Schema({

  
    firstName: {
        type: String,
        required: true,
    },
    
    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
  

    created_at: {
        type: Date,
        default: Date.now()
    },
    hash : String, 
    salt : String 
}, )
    
UserSchema.methods.setPassword = function(password) { 
     
    // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
       // Hashing user's salt and password with 1000 iterations, 
        
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   }; 
     
   // Method to check the entered password is correct or not 
   UserSchema.methods.validPassword = function(password) { 
       var hash = crypto.pbkdf2Sync(password,  
       this.salt, 1000, 64, `sha512`).toString(`hex`); 
       return this.hash === hash; 
   }; 
     

module.exports =  mongoose.model("User", UserSchema);