const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const AddressSchema = mongoose.Schema(
  {
    city: String,
    street: String,
    building: String,
  },
  { _id: false }
);

const ChildSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      unique: true,
      index: true,
    },
    fullname: String,
    level: {
      type: String,
      enum: ["PreKG", "KG1", "KG2"],
      required: true,
    },
    image: { type: String, required: true },
    adddress: AddressSchema,
  },
  { _id: false }
);
ChildSchema.plugin(AutoIncrement, { id: "childId", inc_field: "_id" });

module.exports = new mongoose.model("Child", ChildSchema);
