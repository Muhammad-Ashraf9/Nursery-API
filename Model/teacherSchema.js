const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateTeacherDataSchema:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - fullname
 *         - password
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           default: "612a6b3c3e4e8e0015c6e8e5"
 *         email:
 *           type: string
 *           default: "Ash@gmail.com"
 *         fullname:
 *           type: string
 *           default: "Ash"
 *         password:
 *           type: string
 *           default: "Ash@1234"
 *         image:
 *           type: string
 *           format: binary
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTeacherSchema:
 *       type: object
 *       required:
 *         - email
 *         - fullname
 *         - password
 *         - image
 *       properties:
 *         email:
 *           type: string
 *           default: "Ash@gmail.com"
 *         fullname:
 *           type: string
 *           default: "Ash"
 *         password:
 *           type: string
 *           default: "Ash@1234"
 *         image:
 *           type: string
 *           format: binary
 */

// create a schema createTeacherSchema for this response
/**
 * {
  "newTeacherData": {
    "email": "Ash@gmail.com",
    "fullname": "Ash",
    "password": "$2b$10$.WcT2vNTDOAniC4T263KBe/DW8J8Io4qBPBttQRfBRiZGLppU38l6",
    "image": "images\\1708815736285-336233924-students.png",
    "_id": "65da7578e44eac909fe7a92d",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE3NTc4ZTQ0ZWFjOTA5ZmU3YTkyZCIsImZ1bGxuYW1lIjoiQXNoIiwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE3MDg4MTU3MzYsImV4cCI6MTcwODgxOTMzNn0.LlM0iRhoSmXTTXkItxzqKbywhsbj8L_DRYEttpGRsVw",
  "message": "Teacher added successfully"
}
/**
 * @openapi
 * components:
 *   schemas:
 *     CreatedTeacherSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           default: ""
 *         fullname:
 *           type: string
 *           default: "Ash"
 *         password:
 *           type: string
 *           default: "Ash@1234"
 *         image:
 *           type: string
 *           format: binary
 */


const TeacherSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true,
  },
  fullname: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
