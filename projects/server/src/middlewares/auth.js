const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (req, res, next) => {
  let token = req.headers.authorization; // token yang sudah diambil melalui request headers authorizationnya
  if (!token) {
    // jika tidak mempunyai token maka unauthorized
    return res.status(401).json({ message: "Unauthorized Request" });
  }
  try {
    token = token.split(" ")[1]; // displit lalu diambil index ke 1 yakni tokennya doang
    if (token === null || !token) {
      // jika token null atau bukan token
      return res.status(401).json({ message: "Unauthorized Request" });
    }
    let verifyUser = jwt.verify(token, process.env.JWT_SECRET); // membuat verify dengan isinya token dan key saat login
    if (!verifyUser) {
      return res.status(401).json({ message: "Unauthorized Request" });
    }
    req.user = verifyUser;
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * Check Role dengan menggunakan nama Rolenya
 * @param {"User" | "Admin" | "Superadmin"} role 
 * @returns {(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => unknown}
 */
function checkRole (role) {
  return function (req, res, next) {
    console.log(req.user);
    if (req.user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(401).json({ 
        message: "Unauthorized", 
        role: req.user.role,
        require: role
      });
    }
    next();
  }
}

module.exports = {
  verifyToken,
  checkRole,
};
