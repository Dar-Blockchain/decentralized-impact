const mongoose = require("mongoose")
const admin = require("./schema/admin")
const project_holder = require("./schema/project_holder")
const project = require("./schema/project")

const express = require("express")
const bodyParser = require("body-parser")
//require("dotenv").config();

const app = express()

mongoose 
 .connect("mongodb+srv://decentreliz:darblockchain@decentrelizimpact.ortax.mongodb.net/?retryWrites=true&w=majority" 
 )   
 .then(() => {
    console.log("Database connected!"  )
    app.listen(3000)
})

 .catch(err => console.log(err));
 //use parsing middelware 
 app.use(bodyParser.json())
 const port = process.env.PORT  || 5000
 //import route
 const adminRoute = require("./routes/admin")
 const projectRoute = require("./routes/project")
 const holderRoute = require("./routes/project_holder")

 //import routes

 app.use('/api',adminRoute ),
 app.use('/seance',projectRoute),
 app.use('/expert',holderRoute)

 // Starting a server
 app.listen(port, ()=>{
    console.log(`App is running at ${port}`)
 })