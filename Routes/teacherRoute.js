const express = require("express");
const {
  getAllTeachers,
  addNewTeacher,
  updateTeacherData,
} = require("../Controller/teacherController");

const router = express.Router();

router
  .route("/teachers")
  .get(getAllTeachers)
  .post(addNewTeacher)
  .put(updateTeacherData);

module.exports = router;
