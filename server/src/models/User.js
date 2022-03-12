const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  salary: {
    type: String,
  },
  dateOfDirth:{
    type: String,
  },
  role:{
    type: String,
  }
});

exports.User = new mongoose.model("user", userSchema);