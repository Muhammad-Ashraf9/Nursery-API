const fs = require("fs");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

require("dotenv").config();

const Teacher = require("../Model/teacherSchema");
const Class = require("../Model/classSchema");
const { removeFile, getImageFullPath } = require("../helper");

exports.getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ data: teachers, message: "Take all teachers" });
  } catch (error) {
    next(error);
  }
};
exports.addNewTeacher = async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  const imagePath = req.file?.path;
  const { fullname, email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
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
exports.updateTeacherData = async (req, res, next) => {
  const { id, fullname, email, password } = req.body;
  const newImagePath = req.file?.path;
  const oldImagePath = req.teacher.image;
  console.log("newImagePath :>> ", newImagePath);
  console.log("oldImagePath :>> ", oldImagePath);
  const hashedPass = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

  let image;
  try {
    if (oldImagePath !== newImagePath) {
      removeFile(getImageFullPath(oldImagePath.slice(7))); //to remove images from image path
      image = newImagePath;
    } else {
      image = oldImagePath;
    }
    const newTeacher = await Teacher.findOneAndUpdate(
      { _id: id },
      {
        fullname,
        email,
        password: hashedPass,
        image,
      },
      { new: true }
    );
    res.status(201).json({ newTeacher, message: "Teacher added successfully" });
  } catch (error) {
    next(error);
  }
};
exports.deleteTeacherById = async (req, res, next) => {
  const { id } = req.body;
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      throw error;
    }
    //delete image from uploads folder
    removeFile(getImageFullPath(deletedTeacher.image.slice(7)));
    res
      .status(200)
      .json({ deletedTeacher, message: "Teacher deleted successfully" });
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
