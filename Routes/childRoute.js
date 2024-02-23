const express = require("express");
const {
  getAllChildren,
  addNewChild,
  updateChildData,
  deleteChild,
  getChildById,
} = require("../Controller/childController");

const router = express.Router();

router
  .route("/child")
  .get(getAllChildren)
  .post(addNewChild)
  .put(updateChildData)
  .delete(deleteChild);

router.get("/child/:id", getChildById);

module.exports = router;
