const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  supervisor: {
    type: mongoose.ObjectId,
    ref: "Teacher",
  },
  children: {
    type: [Number],
    ref: "Child",
  },
});

module.exports = mongoose.model("Class", classSchema);
