const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const classSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      unique: true,
      index: true,
    },
    name: String,
    supervisor: {
      type: mongoose.ObjectId,
      ref: "Teacher",
    },
    children: {
      type: [Number],
      ref: "Child",
    },
  },
  { _id: false }
);
classSchema.plugin(AutoIncrement,{id:"classId",inc_field:"_id"})

module.exports = mongoose.model("Class", classSchema);
