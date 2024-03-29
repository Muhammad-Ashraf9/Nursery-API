const express = require("express");
const validator = require("../Middlewares/validation/validator");

const {
  getAllChildren,
  addNewChild,
  updateChildData,
  deleteChild,
  getChildById,
} = require("../Controller/childController");
const {
  childParamIdValidation,
  childDataValidation,
  childUpdateValidation,
  childBodyIdValidation,
} = require("../Middlewares/validation/childValidation");
const { isAdmin } = require("../Middlewares/AuthorizationMW");

const router = express.Router();

router
  .route("/child")
  /**
   * @openapi
   * /child:
   *  get:
   *   tags:
   *    - "Children"
   *   summary: "Get all children"
   *   description: "Get all children"
   *   responses:
   *    200:
   *     description: "All children"
   *    500:
   *     description: "Server error"
   *    422:
   *     description: "Validation error"
   */
  .get(getAllChildren)
  /**
   * @openapi
   * /child:
   *  post:
   *   tags:
   *    - "Children"
   *   summary: "Add new child"
   *   description: "Add new child"
   *   requestBody:
   *    required: true
   *    content:
   *     application/json:
   *      schema:
   *       type: object
   *       properties:
   *        fullname:
   *         type: string
   *        age:
   *         type: number
   *        classId:
   *         type: string
   *       required:
   *        - fullname
   *        - age
   *        - classId
   *   responses:
   *    201:
   *     description: "Child added successfully"
   *    422:
   *     description: "Validation error"
   *    500:
   *     description: "Server error"
   */
  .post(isAdmin, childDataValidation(), validator, addNewChild)
  /**
   * @openapi
   * /child:
   *  put:
   *   tags:
   *    - "Children"
   *   summary: "Update child data"
   *   description: "Update child data"
   *   requestBody:
   *    required: true
   *    content:
   *     application/json:
   *      schema:
   *       type: object
   *       properties:
   *        id:
   *         type: string
   *        fullname:
   *         type: string
   *        age:
   *         type: number
   *        classId:
   *         type: string
   *       required:
   *        - id
   *        - fullname
   *        - age
   *        - classId
   *   responses:
   *    200:
   *     description: "Child updated successfully"
   *    422:
   *     description: "Validation error"
   *    500:
   *     description: "Server error"
   */
  .put(isAdmin, childUpdateValidation(), validator, updateChildData)
  /**
   * @openapi
   * /child:
   *  delete:
   *   tags:
   *    - "Children"
   *   summary: "Delete child"
   *   description: "Delete child"
   *   requestBody:
   *    required: true
   *    content:
   *     application/json:
   *      schema:
   *       type: object
   *       properties:
   *        id:
   *         type: string
   *       required:
   *        - id
   *   responses:
   *    200:
   *     description: "Child deleted successfully"
   *    422:
   *     description: "Validation error"
   *    500:
   *     description: "Server error"
   */
  .delete(isAdmin, childBodyIdValidation(), validator, deleteChild);

/**
 * @openapi
 * /child:
 *  put:
 *   tags:
 *    - "Children"
 *  summary: "Update child data"
 * description: "Update child data"
 * requestBody:
 *  required: true
 *  content:
 *   application/json:
 *    schema:
 *     type: object
 *     properties:
 *      id:
 *       type: string
 *      fullname:
 *       type: string
 *      age:
 *       type: number
 *      classId:
 *       type: string
 *     required:
 *      - id
 *      - fullname
 *      - age
 *      - classId
 * responses:
 *  200:
 *  description: "Child updated successfully"
 * 422:
 * description: "Validation error"
 * 500:
 * description: "Server error"
 */

router.get("/child/:id", childParamIdValidation(), validator, getChildById);
/**
 * @openapi
 * /child/{id}:
 *   get:
 *     tags:
 *       - "Children"
 *     summary: "Get child by id"
 *     description: "Get child by id"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Child data"
 *       422:
 *         description: "Validation error"
 *       500:
 *         description: "Server error"
 */

module.exports = router;
