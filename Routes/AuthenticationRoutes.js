const express = require("express");
const { login } = require("../Controller/authController");
const { loginValidation } = require("../Middlewares/validation/authValidation");
const validator = require("../Middlewares/validation/validator");
const {
  teacherDataValidation,
} = require("../Middlewares/validation/teacherValidations");
const { addNewTeacher } = require("../Controller/teacherController");

const router = express.Router();
/**
 * const TeacherSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true,
  },
  fullname: String,
  password: String,
  image: String,
});
 */

/**
 * @openapi
 * /:
 * '/teachers':
 *   post:
 *     tags:
 *       - "Teachers"
 *     summary: "Register a new teacher"
 *     description: "Register a new teacher"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - fullname
 *               - email
 *               - password
 *               - image
 *     responses:
 *       201:
 *         description: "Teacher registered successfully"
 *       422:
 *         description: "Validation error"
 *       500:
 *         description: "Server error"
 */
router.post("/teachers", teacherDataValidation(), validator, addNewTeacher);

/**
 * @openapi
 * /:
 * '/login':
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: "Login"
 *     description: "Login"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: "Login successful"
 *       422:
 *         description: "Validation error"
 *       500:
 *         description: "Server error"
 */

router.post("/login", loginValidation(), validator, login);

module.exports = router;
