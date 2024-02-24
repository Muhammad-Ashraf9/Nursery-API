const { body, param, check } = require("express-validator");
const Teacher = require("../../Model/teacherSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.loginValidation = () => [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email, { req }) => {
      const teacher = await Teacher.findOne({ email });
      if (teacher) {
        req.teacher = teacher;
        return true;
      } else if (email === process.env.ADMIN_EMAIL) {
        req.admin = process.env.ADMIN_EMAIL;
        return true;
      } else {
        throw new Error("E-mail not found");
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
    )
    .custom(async (password, { req }) => {
      console.log("req.admin", req.admin);
      console.log("req.teacher", req.teacher);

      if (req.admin && password === process.env.ADMIN_PASSWORD) {
        return true;
      } else if (req.teacher) {
        const isMatch = await bcrypt.compare(password, req.teacher.password);
        if (isMatch) {
          return true;
        }
      }
      throw new Error("Password is incorrect");
    }),
];
