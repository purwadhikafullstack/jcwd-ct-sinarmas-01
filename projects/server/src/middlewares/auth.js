require("dotenv/config");
const jwt = require("jsonwebtoken");

const authMiddleware = {
  /**
   * Mendapatkan informasi mengenai user dari token yang dikirim ke header
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  getUser: async function (req, res, next) {
    try {
      const { authorization } = req.headers;
      const err = {
        message: "Unauthorized",
      };
      if (!authorization) {
        return res.status(401).json(err);
      }
      const token = authorization.split(" ")[1];

      const user = await jwt.verify(token, process.env.JWT_SECRET);
      if (!user) {
        return res.status(401).json(err);
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  /**
   * Memeriksa Privilege Role Admin
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  isAdmin: async function (req, res, next) {
    try {
      const { user } = req;
      if (user.role !== "Admin") {
        return res.status(401).json({ message: "Unauthorized" });
      }
      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  /**
   * Verifikasi admin warehouse
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next 
   */
  isWarehouseAdmin: async function (req, res, next) {
    try {
      const { user } = req;
      if (user.role !== "User") {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

module.exports = authMiddleware;
