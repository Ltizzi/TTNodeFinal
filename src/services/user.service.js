import { userModel } from "../models/user.model.js";
import { generateToken } from "../utils/jwtUtils.js";

function authUser(loginData) {
  const userData = userModel.authUser(loginData);
  return generateToken(userData);
}

function createUser(signInData) {
  const userData = userModel.createUser(signInData);
  return generateToken(userData);
}

export const userService = {
  authUser,
  createUser,
};
