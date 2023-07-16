const { authController, accountController } = require("../controllers");
const { body, validationResult } = require("express-validator");
const { verifyToken } = require("../middlewares/auth");
const router = require("express").Router();
const { validPass } = require("../lib/regex");
const errValid = (req, res, next) => {
  const error = validationResult(req);
  console.log(error);
  const arr = error.array();
  if (!error.isEmpty()) return res.status(422).json({ errors: arr, message: arr[0].msg });
  next();
};
router.post(
  "/register",
  body("email").isEmail().withMessage("Format email harus valid"),
  errValid,
  authController.registerUser
);
router.post("/login", body("email").isEmail(), errValid, authController.login);
router.post(
  "/pass",
  body("password").matches(validPass, "Invalid Password Format"),
  errValid,
  authController.setPassword
);
router.post("/reset", authController.requestReset);
router.put("/account/:mode/:token", authController.setPassword);
router.get("/role", verifyToken, accountController.getRole);

module.exports = router;