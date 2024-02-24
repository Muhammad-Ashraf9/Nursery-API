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
const { isAdmin, isAdminOrTeacher } = require("../Middlewares/AuthorizationMW");

const router = express.Router();

/**
 * @openapi
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Add a new teacher
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateTeacherSchema'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/CreatedTeacherSchema'
 *
 *   put:
 *     summary: Update teacher data
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTeacherDataSchema'
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete a teacher
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeacherBodyId'
 *     responses:
 *       200:
 *         description: Success
 * /teachers/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 * /teachers/supervisors:
 *   get:
 *     summary: Get all class supervisors
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: Success
 */
router
  .route("/teachers")
  .get(getAllTeachers)
  .put(
    isAdminOrTeacher,
    teacherUpdateValidation(),
    validator,
    updateTeacherData
  )
  .delete(isAdmin, teacherBodyIdValidation(), validator, deleteTeacherById);

router.get("/teachers/supervisors", getAllClassSupervisors);

router.get(
  "/teachers/:id",
  teacherParamIdValidation(),
  validator,
  getTeacherById
);

module.exports = router;
