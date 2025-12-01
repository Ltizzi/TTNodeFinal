import jwt from "jsonwebtoken";
import "dotenv/config";
import { userModel } from "../models/user.model.js";

const secret = process.env.JWT_SECRET_KEY;

export function generateToken(user) {
  const tokenData = { id: user.id, email: user.email };
  const expiration = { expiresIn: "12h" };
  return jwt.sign(tokenData, secret, expiration);
}

//Para Authentication
export function authenticate(req, res, next) {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: "Invalid token" });

  jwt.verify(token, secret, (err) => {
    if (err) return res.status(403).json({ error: "User is not authorizated" });
    next();
  });
}

//Para Authorization
export function isAdmin(req, res, next) {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: "Invalid token" });
  const data = jwt.decode(token);
  const isAdmin = userModel.checkIsAdmin(data.email);
  if (!isAdmin)
    return res.status(403).json({ error: "Must be admin to access!" });
  next();
}

function getToken(req) {
  return req.headers["authorization"].split(" ")[1];
}
