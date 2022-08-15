const mongoose = require("mongoose")
const User = require("./models/User")
const seance = require("./models/seance")
const expert = require("./models/expert")

const express = require("express")
const bodyParser = require("body-parser")
var cookieParser = require('cookie-parser')
const cors = require("cors")
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
 app.use(cookieParser())
 app.use(cors())
 const port = process.env.PORT  || 5000
 //import route
 const userRoutes= require("./routes/user")
 const seanceRoutes = require("./routes/seance")
 const expertRoutes = require("./routes/expert")

 //import routes

 app.use('/api',userRoutes),
 app.use('/seance',seanceRoutes),
 app.use('/expert',expertRoutes)

 // Starting a server
 app.listen(port, ()=>{
    console.log(`App is running at ${port}`)
 })



