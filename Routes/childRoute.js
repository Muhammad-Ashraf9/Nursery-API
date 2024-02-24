const express = require("express");
const validator = require("../Middlewares/validation/validator");

const {
  getAllChildren,
  addNewChild,
  updateChildData,
  deleteChild,
  getChildById,
} = require("../Controller/childController");
const {
  childParamIdValidation,
  childDataValidation,
  childUpdateValidation,
} = require("../Middlewares/validation/childValidation");

const router = express.Router();

router
  .route("/child")
  .get(getAllChildren)
  // .post(childDataValidation(), validator.imageValidation, validator, addNewChild)
  .post(childDataValidation(), validator, addNewChild)
  .put(childUpdateValidation(), validator, updateChildData)
  .delete(deleteChild);

router.get("/child/:id", childParamIdValidation(), validator, getChildById);

module.exports = router;
