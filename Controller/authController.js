require("dotenv").config();
const jwt = require("jsonwebtoken");
const Teacher = require("../Model/teacherSchema");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  let payload;
  if (req.admin) {
    payload = { id: 0, role: "admin" };
  } else {
    payload = { id: req.teacher._id, role: "teacher" };
  }
  console.log("payload :>> ", payload);
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return res.status(200).json({ message: "logged in successfully", token });
};
