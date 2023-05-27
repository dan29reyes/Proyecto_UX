const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];
  console.log("token", token);
  if (token == null) {
    res.status(401).send("Unauthorized");
  }

  jwt.verify(token, "AS4D5FF6G78NHCV7X6X5C", function (e, user) {
    if (e) {
      console.log(e);
      return res.status(403).send("invalid token");
    }
    else {
      req.user = user;
      next();
    }
  });
}

module.exports = {
  authenticateToken
};