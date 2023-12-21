const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.cookies.accessToken ||
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"];
  if (!token) return res.status(401).send("You are not authenticated!");

  // jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
  //   if (err) return res.status(403).send("token is invalid");
  //   req.userId = payload.id;
  //   req.isSeller = payload.isSeller;
  // });

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
  } catch (error) {
    return res.status(401).send("token is invalid");
  }

  // console.log(req.isSeller);
  return next();
};

module.exports = verifyToken;
