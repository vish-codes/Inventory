import { JWT_SECRET } from "../server.js";
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
    console.log('one')
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).json({ message: "access denied" });
  }
  console.log('two')
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('three')
    if (decoded.userId) { 
      next();
    } else {
      res.status(403).json({
        message: "access denied",
      });
    }
  } catch (err) {
    res.status(403).json({
      message: "access denied",
    });
  }
}

export { authMiddleware };