const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

/**
 * @openapi
 * components:
 *    schemas:
 *     AddressSchema:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *         street:
 *           type: string
 *         building:
 *           type: string
 *     ChildSchema:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *         fullname:
 *           type: string
 *         level:
 *           type: string
 *           enum:
 *             - PreKG
 *             - KG1
 *             - KG2
 *           required: true
 *         age:
 *           type: number
 *           required: true
 *           minimum: 2
 *           maximum: 6
 *         image:
 *           type: string
 *           required: true
 *         address:
 *          $ref: '#/components/schemas/AddressSchema'
 *      required: true
 *
 */
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
    age: { type: Number, required: true, min: 2, max: 6 },
    image: { type: String, required: true },
    address: { type: AddressSchema, required: true },
  },
  { _id: false }
);
ChildSchema.plugin(AutoIncrement, { id: "childId", inc_field: "_id" });

module.exports = new mongoose.model("Child", ChildSchema);
