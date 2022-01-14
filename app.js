const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

require("dotenv").config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const { indexController } = require("./controllers/indexController");
const {  customerDisplayController} = require("./controllers/customerDisplayController");
const {displayTransactionsController,} = require("./controllers/displayTransactionsController");
const { transferFundsController,} = require("./controllers/transferFundsController");
const {customerAddController} = require("./controllers/customerAddController");

app.use(cors());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

const connection = mongoose.connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ydyc5.mongodb.net/Bank?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  
  connection
    .then((response) => {
      console.log("Database has been connected!");
      app.listen(5000, () => {
        console.log(`Server is running on Port: 5000`);
      });
    })
    .catch((err) => {
      console.log(err);
    });


app.get("/", indexController);
app.get("/customers/:id", customerDisplayController);
app.get("/customers/:id/transactions", displayTransactionsController);
app.post("/customers/:id/transferFunds", transferFundsController);
app.post("/customers", customerAddController);



