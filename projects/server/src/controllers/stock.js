/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
async function newStock (req, res) {
  try {
    
  } catch (e) {
    return res.status(500).json({ message: e.message, error: e });
  }
}
async function requestStock (req, res) {
  try {

  } catch (e) {
    return res.status(500).json({ message: e.message, error: e });
  }
}

const stockController = {};
module.exports = stockController;
module.exports.default = stockController;