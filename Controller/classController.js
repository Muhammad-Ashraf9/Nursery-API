const Class = require("../Model/classSchema");

exports.getAllClasses = (req, res, next) => {
  Class.find()
    .then((classes) => {
      res.status(200).json({ data: classes, message: "Take all classes" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getClassById = (req, res, next) => {
  const id = req.params.id;
  Class.find({ _id: id })
    .then((c) => {
      res.status(200).json({ data: c, message: `Take class with id ${id}` });
    })
    .catch((err) => {
      next(err);
    });
};

exports.addNewClass = (req, res, next) => {
  const data = req.body;
  console.log(data);
  const newClass = new Class({ _id: 1, supervisor: 1, children: [1, 2] });
  newClass
    .save()
    .then((c) => {
      res.status(200).json({ data: c, message: `add new class` });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateClassData = (req, res, next) => {
  const data = req.body;
  res.status(200).json({ data, message: `update class with id ${data.id}` });
};
exports.deleteClass = (req, res, next) => {
  const id = req.body.id;
  res.status(200).json({ id, message: `delete class with id ${id}` });
};

exports.getClassChildrenInfo = (req, res, next) => {
  const id = req.params.id;
  res
    .status(200)
    .json({ id, message: `Take class children info with id ${id}` });
};
exports.getClassSupervisorInfo = (req, res, next) => {
  const id = req.params.id;
  res
    .status(200)
    .json({ id, message: `Take class supervisor info with id ${id}` });
};
