const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//$ref: '#/components/schemas/ClassData'

/**
 * @openapi
 * components:
 *   schemas:
 *     ClassData:
 *       type: object
 *       required:
 *         - name
 *         - supervisor
 *         - children
 *       properties:
 *         name:
 *           type: string
 *           default: "Class 1"
 *         supervisor:
 *           type: string
 *           default: "612a6b3c3e4e8e0015c6e8e5"
 *         children:
 *           type: string
 *           default: "612a6b3c3e4e8e0015c6e8e5"
 */

//$ref: '#/components/schemas/ClassBodyId'

/**
 * @openapi
 * components:
 *   schemas:
 *     ClassBodyId:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 */

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
classSchema.plugin(AutoIncrement, { id: "classId", inc_field: "_id" });

module.exports = mongoose.model("Class", classSchema);
