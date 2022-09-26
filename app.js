const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

//require("dotenv").config();

const port = process.env.PORT ||5000 ;

//import route
const userRoutes = require("./src/routes/user");
const seanceRoutes = require("./src/routes/seance");
const expertRoutes = require("./src/routes/expert");
const projectRoute = require("./src/routes/project");
const adminRoutes = require("./src/routes/admin");

const app = express();

mongoose
  .connect(
    "mongodb+srv://decentreliz:darblockchain@decentrelizimpact.ortax.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected!");
    // Starting a server
    app.listen(port, process.env.ALWAYSDATA_HTTP_ID, () => {
      console.log(`App is running at ${port}`);
    });
  })
  .catch((err) => console.log(err));

// for cors origin config
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//use parsing middelware
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/seance", seanceRoutes);
app.use("/expert", expertRoutes);
app.use("/project", projectRoute);
app.use("/admin", adminRoutes);
