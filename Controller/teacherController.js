exports.getAllTeachers = (req, res) => {
  res.status(200).json({ data: [{}, {}], message: "take all teachers" });
};
exports.addNewTeacher = (req, res) => {
  const data = req.body;
  res.status(201).json({ data, message: "new teacher added" });
};
exports.updateTeacherData = (req, res) => {
  const id = req.body.id;
  res.status(201).json({ id, message: "update teacher data" });
};
