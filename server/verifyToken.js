const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("Received token:", token);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("Not a valid token:", err); // Log the error
        return res.status(403).json("Not valid Token");
      }
      req.user = user;
      next();
    });
  } else { 
    return res.status(401).json(authHeader);
    console.log("valid")
  }
};

module.exports = { verifyToken};
