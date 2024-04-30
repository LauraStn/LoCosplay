const jwt = require("jsonwebtoken");
const { extractToken } = require("./extractToken");
require("dotenv").config();

const verifyToken = async (req, res) => {
  const token = await extractToken(req);
  if (!token) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  return jwt.verify(token, process.env.SECRET_KEY, async (error, data) => {
    if (error) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    return data;
  });
};
module.exports = { verifyToken };
