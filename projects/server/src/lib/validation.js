const { validationResult } = require("express-validator");
function isValid (req, res, next) {
  const error = validationResult(req);
  const errors = error.array();
  if (!error.isEmpty()) return res.status(409).json({ errors, message: errors[0].msg });
  next();
};
module.exports = isValid;