const { body, param } = require("express-validator");
const Child = require("../../Model/childSchema");
const levels = ["PreKG", "KG1", "KG2"];

exports.childParamIdValidation = () => [
  param("id").isInt().withMessage("Not a valid Id"),
];

exports.childDataValidation = () => [
  body("fullname")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("fullname has to be string and at least 3 characters"),
  body("age")
    .isInt({ min: 2, max: 6 })
    .withMessage("age has to be Number less than "),
  body("level").custom((value) => {
    if (levels.indexOf(value) === -1)
      throw Error(`level has to be on of these ${levels.join(" | ")}`);
    return true;
  }),
  body("street").trim().isString().withMessage("street must be string"),
  body("building").trim().isString().withMessage("building must be string"),
  body("city")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("city must be string at least 3 characters"),
  body("fullname").custom((value, { req }) => {
    if (!req.file) throw Error("Image is Required");
    return true;
  }),
];

exports.childUpdateValidation = () => [
  body("id")
    .isInt()
    .withMessage("Not a valid Id")
    .custom(async (id, { req }) => {
      const child = await Child.findById(id);
      if (!child) throw Error("Child not found");
      req.child = child;
      return true;
    }),
  body("fullname")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("fullname has to be string and at least 3 characters"),
  body("age")
    .isInt({ min: 2, max: 6 })
    .withMessage("age has to be Number less than "),
  body("level").custom((value) => {
    if (levels.indexOf(value) === -1)
      throw Error(`level has to be on of these ${levels.join(" | ")}`);
    return true;
  }),
  body("street").trim().isString().withMessage("street must be string"),
  body("building").trim().isString().withMessage("building must be string"),
  body("city")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("city must be string at least 3 characters"),
];
