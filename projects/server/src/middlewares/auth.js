const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (req, res, next) => {
  let token = req.headers.authorization; // token yang sudah diambil melalui request headers authorizationnya
  const failMsg = { message: "Unauthorized Request", role: null }
  if (!token) {
    // jika tidak mempunyai token maka unauthorized
    return res.status(401).json(failMsg);
  }
  try {
    token = token.split(" ")[1]; // displit lalu diambil index ke 1 yakni tokennya doang
    if (token === null || !token) {
      // jika token null atau bukan token
      return res.status(401).json(failMsg);
    }
    let verifyUser = jwt.verify(token, process.env.JWT_SECRET); // membuat verify dengan isinya token dan key saat login
    if (!verifyUser) {
      return res.status(401).json(failMsg);
    }
    req.user = verifyUser;
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * Check Role dengan menggunakan nama Rolenya
 * @param {string[]} roles
 * @returns {(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => unknown}
 */
function checkRole (roles) {
  return function (req, res, next) {
    const { isVerified } = req.user;
    const userRole = req.user.role.toLowerCase();
    const found = roles.findIndex((a) => a.toLowerCase() === userRole);

    if (found < 0 || !isVerified) {
      return res.status(401).json({ 
        message: "Unauthorized", 
        role: req?.user?.role || null,
        require: roles
      });
    }
    next();
  }
}

module.exports = {
  verifyToken,
  checkRole,
};
