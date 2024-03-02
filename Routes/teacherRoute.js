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
const { isAdmin, isAdminOrTeacher } = require("../Middlewares/authorizationMW");

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
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 *   post:
 *     summary: Add a new teacher
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateTeacherSchema'
 *     responses:
 *       201:
 *         description: Teacher registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatedTeacherSchema'
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
 *       201:
 *         description: Success
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
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
 *       422:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
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
 *     security:
 *       - bearerAuth: []
 * /teachers/supervisors:
 *   get:
 *     summary: Get all class supervisors
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
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
