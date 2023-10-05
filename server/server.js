const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Secret key for JWT token
const secretKey = "hafsfffgg72846285jjjkh54646467hh"; // Replace with a strong secret key

// Mock user credentials
const authorizedUsers = [
  { email: "harischandar@gmail.com", password: "hari12345" },
];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid Token" });
      }
      console.log(user)
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
    console.log(valid)
  }
};

// Endpoint to handle user login
app.post("/api/user/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the user credentials match any authorized users
  const authorizedUser = authorizedUsers.find(
    (user) => user.email === email && user.password === password
  );

  if (!authorizedUser) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Generate a JWT token
  const token = jwt.sign({ email: authorizedUser.email }, secretKey);
  console.log(token)
  res.json({ message: "Login successful", token });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
