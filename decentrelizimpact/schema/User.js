const mongoose = require("mongoose")
const options = { discriminatorKey: 'itemtype' };
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
}, options)
    
    UserSchema.methods.setPassword = function(password){
        this.salt = crypto.randomBytes(16).toString(`hex`);
        this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64,`sha512`).toString(`hex`);
    };
    UserSchema.methods.validPassword = function(password){
        var hash = crypto.pbkdf2Sync(password,  
            this.salt, 1000, 64, `sha512`).toString(`hex`); 
            return this.hash === hash; 
    };


module.exports =  mongoose.model("User", UserSchema);