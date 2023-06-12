const { authControllers } = require("../controllers");
const { verifyToken, checkRole } = require("../middlewares/auth");
const { body, validationResult } = require("express-validator");
const router = require("express").Router();
const { validPass } = require("../lib/regex");
const errValid = (req, res, next) => {
  const error = validationResult(req);
  console.log(error);
  const arr = error.array();
  if (!error.isEmpty())
    return res.status(422).json({ errors: arr, message: arr[0].msg });
  next();
};
router.post(
  "/register",
  body("email").isEmail().withMessage("Format email harus valid"),
  errValid,
  authControllers.registerUser
);
router.post("/login", body("email").isEmail(), errValid, authControllers.login);
router.post(
  "/pass",
  body("password").matches(validPass, "Invalid Password Format"),
  errValid,
  authControllers.setPassword
);

module.exports = router;
