const Class = require("../Model/classSchema");

exports.getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find();
    res.status(200).json({ data: classes, message: "Take all classes" });
  } catch (error) {
    next(error);
  }
};

exports.getClassById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const classData = await Class.findById(id);
    res
      .status(200)
      .json({ data: classData, message: `Take class with id ${id}` });
  } catch (error) {
    next(error);
  }
};

exports.addNewClass = async (req, res, next) => {
  const createdClass = new Class(req.body);
  try {
    const newClass = await createdClass.save();
    res
      .status(201)
      .json({ data: newClass, message: "Class added successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateClassData = async (req, res, next) => {
  const data = req.body;
  try {
    const classData = await Class.findByIdAndUpdate(data.id, data, {
      new: true,
    });
    res
      .status(201)
      .json({ data: classData, message: `update class with id ${data.id}` });
  } catch (error) {
    next(error);
  }
};
exports.deleteClass = async (req, res, next) => {
  const id = req.body.id;

  try {
    const classData = await Class.findByIdAndDelete(id);
    res.status(200).json({ classData, message: "Class deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getClassChildrenInfo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const classData = await Class.findById(id).populate("children");
    if (!classData) {
      const error = new Error("No class with this id");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      data: classData.children,
      message: `Take children of class with id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
exports.getClassSupervisorInfo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const classData = await Class.findById(id).populate("supervisor");
    if (!classData) {
      const error = new Error("No class with this id");
      error.statusCode = 404;
      throw error;
    }
    if(!classData.supervisor){
      const error = new Error("No supervisor for this class");
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json({
      data: classData.supervisor,
      message: `Take supervisor of class with id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
