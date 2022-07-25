const mongoose = require("mongoose")

const seanceSchema = new mongoose.Schema({
    date :{
        type : Date,
        required : true,
    },
    url :{
        type: String,
        required :true,
    },
    dure :{
        type: TimeRanges,
    },
    project :{
        type : mongoose.Schema.Types.ObjectId, ref: "Project"
    },
    expert :{
        type : mongoose.Schema.Types.ObjectId, ref: "Expert"
    }
})

module.exports =  mongoose.model("Seance", seanceSchema);