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
  teacherIdValidation,
} = require("../Middlewares/validation/teacherValidations");
const validator = require("../Middlewares/validation/validator");

const router = express.Router();

router
  .route("/teachers")
  .get(getAllTeachers)
  .put(updateTeacherData)
  .delete(deleteTeacherById);

router.get("/teachers/supervisors", getAllClassSupervisors);

router.get("/teachers/:id", teacherIdValidation, validator, getTeacherById);

module.exports = router;
