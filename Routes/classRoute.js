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


  /**
   * @openapi
   * /class:
   *   get:
   *     summary: Get all classes
   *     tags: [Class]
   *     responses:
   *       200:
   *         description: Success
   *   post:
   *     summary: Add a new class
   *     tags: [Class]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ClassData'
   *     responses:
   *       200:
   *         description: Success
   *   put:
   *     summary: Update class data
   *     tags: [Class]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ClassData'
   *     responses:
   *       200:
   *         description: Success
   *   delete:
   *     summary: Delete a class
   *     tags: [Class]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ClassBodyId'
   *     responses:
   *       200:
   *         description: Success
   * /class/{id}:
   *   get:
   *     summary: Get class by ID
   *     tags: [Class]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   * /class/teacher/{id}:
   *   get:
   *     summary: Get class supervisor info
   *     tags: [Class]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   * /class/child/{id}:
   *   get:
   *     summary: Get class children info
   *     tags: [Class]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   */
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
