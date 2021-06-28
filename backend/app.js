const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require('./routes/user');

const productRoutes = require("./routes/products");

const app = express();

mongoose.connect("mongodb+srv://ikse:" + process.env.MONGO_ATLAS_PW + "@ikse.qwzff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use("/images", express.static(path.join("backend/images")));
  app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
      next();
  });
  

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);


module.exports = app;