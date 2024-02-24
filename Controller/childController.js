const Child = require("../Model/childSchema");
const { removeFile, getImageFullPath } = require("../helper");
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
  const { fullname, city, street, building, level, age } = req.body;
  const imagePath = req.file?.path;
  const address = { city, street, building };
  const child = new Child({ level, fullname, image: imagePath, age, address });
  try {
    const newChild = await child.save();
    res
      .status(201)
      .json({ data: newChild, message: "Child added successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateChildData = async (req, res, next) => {
  const { id, fullname, city, street, building, level, age } = req.body;
  const address = { city, street, building };
  const newImagePath = req.file?.path;
  let { image } = req.child;
  console.log("image", image);
  console.log("newImagePath", newImagePath);
  if (newImagePath) {
    removeFile(getImageFullPath(image.slice(7)));
    image = newImagePath;
  }

  try {
    const updatedChild = await Child.findByIdAndUpdate(
      id,
      {
        level,
        fullname,
        image,
        age,
        address,
      },
      { new: true }
    );

    res
      .status(201)
      .json({ data: updatedChild, message: "Child updated successfully" });
  } catch (error) {
    next(error);
  }
};
exports.deleteChild = async (req, res, next) => {
  const id = req.child._id;
  try {
    await Child.deleteOne({ _id: id }, { new: true });
    removeFile(getImageFullPath(req.child.image.slice(7)));
    res
      .status(201)
      .json({ deleteChild: req.child, message: `delete child with id ${id}` });
  } catch (error) {
    next(error);
  }
};
