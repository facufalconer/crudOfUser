//IMPORTS
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/User");
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

const PORT = 8080;

const MONGO_URI = "mongodb://127.0.0.1:27017/usersss";
mongoose.connect(MONGO_URI, {
useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true,
  
});

app.use(express.json());




app.use(userRoutes);
app.listen(PORT, () => console.log("Starting app in port",PORT));