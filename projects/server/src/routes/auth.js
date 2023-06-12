const { authControllers } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/auth");
const { body, validationResult } = require("express-validator");
const router = require("express").Router();
router.post(
  "/register",
  body("email").isEmail(),
  (req, res, next) => {
    const error = validationResult(req);
    console.log(error);
    if (!error.isEmpty()) {
      return res.status(409).json({ message: "Email harus format email!" });
    }
    next(); // jika tervalidasi email maka akan next
  },
  authControllers.registerUser
);
router.patch("/verified", verifyToken, authControllers.verification);
router.post("/setting-password", verifyToken, authControllers.setPassword);

module.exports = router;
