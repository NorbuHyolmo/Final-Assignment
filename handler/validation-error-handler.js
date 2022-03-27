const { check, validationResult } = require("express-validator");

const catchValidationError = (fn) => {
  return function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return fn(req, res, next);
    }
    let errorData = errors.mapped();
    return res.status(422).json(errorData);
  };
};

const catchFormValidationError = (fn) => {
  return function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return fn(req, res, next).catch((err) => next(err));
    }
    let errorData = errors.mapped();
    req.flash("oldInput", req.body);
    req.flash("errors", errorData);
    return res.redirect("back");
  };
};

module.exports = {
  catchValidationError,
  catchFormValidationError,
};
