const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const secret = "helloMyNameIsShinchuHowAreYou";
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  const verifyToken = jwt.verify(token, secret);
  const rootUser = await userdb.findOne({ _id: verifyToken._id });
  if (!rootUser) {
    throw new Error("user not found");
  }
  req.token = token;
  req.rootUser = rootUser;
  req.userId = rootUser._id;
  next();
};
module.exports = authenticate;
