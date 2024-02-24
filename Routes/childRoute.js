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
  childBodyIdValidation,
} = require("../Middlewares/validation/childValidation");
const { isAdmin } = require("../Middlewares/AuthorizationMW");

const router = express.Router();

router
  .route("/child")
  .get(getAllChildren)
  // .post(childDataValidation(), validator.imageValidation, validator, addNewChild)
  .post(isAdmin, childDataValidation(), validator, addNewChild)
  .put(isAdmin, childUpdateValidation(), validator, updateChildData)
  .delete(isAdmin, childBodyIdValidation(), validator, deleteChild);

router.get("/child/:id", childParamIdValidation(), validator, getChildById);

module.exports = router;
