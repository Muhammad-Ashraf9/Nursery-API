exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    const error = new Error("Not authorized");
    error.statusCode = 401;
    throw error;
  }
  next();
};

exports.isTeacher = (req, res, next) => {
  if (req.user.role !== "teacher") {
    const error = new Error("Not authorized");
    error.statusCode = 401;
    throw error;
  }
  next();
};

exports.isAdminOrTeacher = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "teacher") {
    const error = new Error("Not authorized");
    error.statusCode = 401;
    throw error;
  }
  next();
};
