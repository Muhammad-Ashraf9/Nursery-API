const Child = require("../Model/childSchema");
exports.getAllChildren = (req, res, next) => {
  Child.find()
    .then((children) => {
      res.status(200).json({ data: children, message: "Take all children" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getChildById = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({ id, message: `Take child with id ${id}` });
};

exports.addNewChild = (req, res, next) => {
  const data = req.body;
  res.status(201).json({ data, message: `add new child` });
};

exports.updateChildData = (req, res, next) => {
  const data = req.body;
  res.status(201).json({ data, message: `update child with id ${data.id}` });
};
exports.deleteChild = (req, res, next) => {
  const id = req.body.id;
  res.status(201).json({ id, message: `delete child with id ${id}` });
};
