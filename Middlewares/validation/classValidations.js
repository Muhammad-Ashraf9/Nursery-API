const { body, param } = require("express-validator");
const Child = require("../../Model/childSchema");
const Teacher = require("../../Model/teacherSchema");
const Class = require("../../Model/classSchema");

exports.classBodyIdValidation = () => [
  body("id")
    .isInt()
    .withMessage("Not a valid Id")
    .custom(async (id, { req }) => {
      const classData = await Class.findOne({ _id: id });
      console.log("classData", classData);
      if (!classData) throw new Error("Class not found");
      req.classData = classData;
      return true;
    }),
];
exports.classParamIdValidation = () => [
  param("id").isInt().withMessage("Not a valid Id"),
];

exports.classDataValidation = () => [
  body("name")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("name has to be string and at least 3 characters"),
  body("supervisor").custom(async (value) => {
    const teacher = await Teacher.findById(value);
    if (!teacher) throw new Error("No teacher with this id");
    return true;
  }),
  body("children")
    .isArray({ min: 1 })
    .withMessage("children has to be an array with At least one child")
    .custom(async (value) => {
      const children = await Child.find({ _id: { $in: value } });
      if (children.length !== value?.length)
        throw new Error("Some children ids are not found");
      return true;
    }),
];
