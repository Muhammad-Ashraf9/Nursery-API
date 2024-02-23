const Teacher = require("../Model/teacherSchema")

exports.getAllTeachers = (req, res) => {
  Teacher.find().then((teachers) => {
    res.status(200).json({ data: teachers, message: "take all teachers" });
  }).catch((err) => {
    next(err)
  });
};
exports.addNewTeacher = (req, res) => {
  const data = req.body;
  res.status(201).json({ data, message: "new teacher added" });
};
exports.updateTeacherData = (req, res) => {
  const id = req.body.id;
  res.status(201).json({ id, message: "update teacher data" });
};
