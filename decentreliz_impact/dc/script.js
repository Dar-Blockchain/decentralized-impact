const mongoose = require("mongoose")
const project = require("./utils/projects.js")
const projects = require ("./schema/project.js")
const express = require("express")
const app = express()
app.use("/", async(req,res) =>{

})
mongoose 
 .connect("mongodb+srv://decentreliz:darblockchain@decentrelizimpact.ortax.mongodb.net/?retryWrites=true&w=majority")   
 .then(() => {
    console.log("Database connected!"  )
    app.listen(3000)
})

 .catch(err => console.log(err));