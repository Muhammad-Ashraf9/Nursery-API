const express = require("express");
const {
  getAllClassren,
  addNewClass,
  updateClassData,
  deleteClass,
  getClassById,
  getAllClasses,
  getClassSupervisorInfo,
  getClassChildrenInfo,
} = require("../Controller/classController");

const router = express.Router();

router
  .route("/class")
  .get(getAllClasses)
  .post(addNewClass)
  .put(updateClassData)
  .delete(deleteClass);

router.get("/class/:id", getClassById);

router.get("/class/supervisor/:id", getClassSupervisorInfo);
router.get("/class/child/:id", getClassChildrenInfo);

module.exports = router;
