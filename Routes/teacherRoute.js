const express = require("express");
const {
  getAllTeachers,
  addNewTeacher,
  updateTeacherData,
  deleteTeacherById,
  getAllClassSupervisors,
  getTeacherById,
} = require("../Controller/teacherController");
const {
  teacherParamIdValidation,
  teacherUpdateValidation,
  teacherBodyIdValidation,
} = require("../Middlewares/validation/teacherValidations");
const validator = require("../Middlewares/validation/validator");
const { isAdmin } = require("../Middlewares/AuthorizationMW");

const router = express.Router();

router
  .route("/teachers")
  .get(getAllTeachers)
  .put(isAdmin, teacherUpdateValidation(), validator, updateTeacherData)
  .delete(isAdmin, teacherBodyIdValidation(), validator, deleteTeacherById);

router.get("/teachers/supervisors", getAllClassSupervisors);

router.get(
  "/teachers/:id",
  teacherParamIdValidation(),
  validator,
  getTeacherById
);

module.exports = router;
