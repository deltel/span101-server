const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = extractToken(req.header("Authorization"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (isAdmin(decoded)) {
      next();
    } else {
      res.status(401).send();
    }
  } catch (e) {
    res.status(500).send({ error: e.stack });
  }
};

const extractToken = (header) => {
  return header.split(" ")[1];
};

const isAdmin = (user) => user.sub === 1 && user.username === "admin";

module.exports = auth;
