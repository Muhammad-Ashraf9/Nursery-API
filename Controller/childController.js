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

exports.getChildById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const child = await Child.findById(id);
    res.status(200).json({ data: child, message: `Take child with id ${id}` });
  } catch (error) {
    next(error);
  }
};

exports.addNewChild = async (req, res, next) => {
  const { fullname, city, street, building, level } = req.body;
  const imagePath = req.file?.path;
  const address = { city, street, building };
  const child = new Child({ level, fullname, image: imagePath, address });
  try {
    const newChild = await child.save();
    res
      .status(201)
      .json({ data: newChild, message: "Child added successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateChildData = async(req, res, next) => {
  const data = req.body;
  res.status(201).json({ data, message: `update child with id ${data.id}` });
};
exports.deleteChild = (req, res, next) => {
  const id = req.body.id;
  res.status(201).json({ id, message: `delete child with id ${id}` });
};
