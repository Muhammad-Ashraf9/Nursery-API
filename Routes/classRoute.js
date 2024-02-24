const express = require("express");
const validator = require("../Middlewares/validation/validator");

const {
  addNewClass,
  updateClassData,
  deleteClass,
  getClassById,
  getAllClasses,
  getClassSupervisorInfo,
  getClassChildrenInfo,
} = require("../Controller/classController");
const {
  classDataValidation,
  classBodyIdValidation,
  classParamIdValidation,
} = require("../Middlewares/validation/classValidations");
const { isAdmin } = require("../Middlewares/AuthorizationMW");

const router = express.Router();

router
  .route("/class")
  .get(getAllClasses)
  .post(isAdmin, classDataValidation(), validator, addNewClass)
  .put(
    isAdmin,
    classBodyIdValidation(),
    classDataValidation(),
    validator,
    updateClassData
  )
  .delete(
    isAdmin,
    classBodyIdValidation(), validator, deleteClass);

router.get("/class/:id", 
    
classParamIdValidation(), validator, getClassById);

router.get(
  "/class/teacher/:id",
  classParamIdValidation(),
  validator,
  getClassSupervisorInfo
);
router.get(
  "/class/child/:id",
  classParamIdValidation(),
  validator,
  getClassChildrenInfo
);

module.exports = router;
