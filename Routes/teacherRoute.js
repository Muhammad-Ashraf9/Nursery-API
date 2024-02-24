const express = require("express");
const {
  getAllTeachers,
  addNewTeacher,
  updateTeacherData,
  deleteTeacherById,
  getAllClassSupervisors,
  getTeacherById,
} = require("../Controller/teacherController");

const router = express.Router();

router
  .route("/teachers")
  .get(getAllTeachers)
  .put(updateTeacherData)
  .delete(deleteTeacherById);

router.get("/teachers/supervisors", getAllClassSupervisors);

router.get("/teachers/:id", getTeacherById);

module.exports = router;
