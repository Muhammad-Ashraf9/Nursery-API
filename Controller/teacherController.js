const fs = require("fs");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const Teacher = require("../Model/teacherSchema");
const Class = require("../Model/classSchema");

exports.getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ data: teachers, message: "Take all teachers" });
  } catch (error) {
    next(error);
  }
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
        fullname: newTeacherData.fullname,
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
exports.updateTeacherData = (req, res, next) => {
  const id = req.body.id;
  res.status(201).json({ id, message: "update teacher data" });
};
exports.deleteTeacherById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findByIdAndDelete(id);
    //delete image from uploads folder
    fs.unlink(teacher.image, (err) => {
      if (err) throw err;
    });
    res.status(200).json({ teacher, message: "Teacher deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getAllClassSupervisors = async (req, res, next) => {
  try {
    const supervisors = await Class.find()
      .populate("supervisor")
      .populate("children");
    res
      .status(200)
      .json({ data: supervisors, message: "take all supervisors" });
  } catch (error) {
    next(error);
  }
};

exports.getTeacherById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ data: teacher, message: "take teacher by id" });
  } catch (error) {
    next(error);
  }
};
