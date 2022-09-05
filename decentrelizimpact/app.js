const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

//require("dotenv").config();

const port = process.env.PORT || 3000;
//import route
const userRoutes = require("./routes/user");
const seanceRoutes = require("./routes/seance");
const expertRoutes = require("./routes/expert");
const projectRoute = require("./routes/project");

const app = express();

mongoose
  .connect(
    "mongodb+srv://decentreliz:darblockchain@decentrelizimpact.ortax.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected!");
    // Starting a server
    app.listen(port, () => {
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