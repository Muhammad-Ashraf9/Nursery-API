const { body, param, check } = require("express-validator");
const Teacher = require("../../Model/teacherSchema");
const { imageValidation } = require("./validator");

exports.teacherIdValidation = [
  param("id").isMongoId().withMessage("Invalid teacher id"),
];

exports.teacherDataValidation = [
  body("fullname").trim().isString().withMessage("Fullname must be string"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email) => {
      const teacher = await Teacher.findOne({ email });
      if (teacher) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .trim()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain at least 6 characters, 1 lowercase, 1 uppercase, 1 number and 1 special character"
    ),
  body("fullname")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Fullname must be string and at least 3 characters"),
  body("email").custom((value, { req }) => {
    //to check if image is uploaded but no image in the request body
    if (req.file) return true;
    throw new Error("Image is required");
  }),
  // imageValidation,
];
