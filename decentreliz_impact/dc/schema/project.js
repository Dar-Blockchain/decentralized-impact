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
    photo: {
        type: Buffer
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
        type : Number,
        required : true,
    },
    holder:{
        type : mongoose.Schema.Types.ObjectId, ref: "project_holder"
    }

})

module.exports =  mongoose.model("project", projectSchema);