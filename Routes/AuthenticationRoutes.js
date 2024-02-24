const express = require("express");
const { login } = require("../Controller/authController");
const { loginValidation } = require("../Middlewares/validation/authValidation");
const validator = require("../Middlewares/validation/validator");

const router = express.Router();

router.post("/login", loginValidation(), validator, login);

module.exports = router;
