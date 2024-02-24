const { validationResult } = require("express-validator");
const { removeFile, getImageFullPath } = require("../../helper");
const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
  let result = validationResult(req);
  console.log('result :>> ', result);
  if (result.errors.length >= 1) {
    if (req.file) {
      removeFile(getImageFullPath(req.file.filename));
    }
    let errorMessages = result.errors.reduce(
      (current, error) => current + error.msg + " ",
      " "
    );
    let error = new Error(errorMessages);
    error.statusCode = 422;
    next(error);
  } else {
    next();
  }
};

exports.imageValidation = (req, res, next) => {
  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    next(error);
  }
  next();
};
