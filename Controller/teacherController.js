const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Teacher = require("../Model/teacherSchema");
exports.getAllTeachers = (req, res) => {
  Teacher.find()
    .then((teachers) => {
      res.status(200).json({ data: teachers, message: "take all teachers" });
    })
    .catch((err) => {
      next(err);
    });
};
exports.addNewTeacher = async (req, res, next) => {
  const imagePath = req.file.path;
  const { fullname, email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const teacher = new Teacher({
      fullname,
      email,
      password: hashedPass,
      image: imagePath,
    });
    const newTeacherData = await teacher.save();
    const token = jwt.sign(
      {
        id: newTeacherData._id,
        fullname: newTeacherData.name,
        role: "teacher",
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res
      .status(201)
      .json({ newTeacherData, token, message: "Teacher added successfully" });
  } catch (error) {
    next(error);
  }
};
exports.updateTeacherData = (req, res) => {
  const id = req.body.id;
  res.status(201).json({ id, message: "update teacher data" });
};
