const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true,
  },
  fullname: String,
  password: String,
  image: String,
});

module.exports =  mongoose.model("Teacher", TeacherSchema);
