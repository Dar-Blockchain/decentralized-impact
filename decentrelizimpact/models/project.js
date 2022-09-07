const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
    },
    category :{
        type: String,
        required : true,
    },
    document : {
        type: Buffle,
    },
    description :{
        type: String,
        required : true,
    },
    state :{
        type : String,
        required : true,
    },
    vote :{
        type : int,
        required : true,
    }

})

module.exports =  mongoose.model("Project", projectSchema);
