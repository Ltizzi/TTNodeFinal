import { userService } from "../services/user.service.js";

export function httpAuthUser(req, res) {
  try {
    const loginCredentials = req.body;

    const response = userService.authUser(loginCredentials);
    return res.status(200).json({ token: response });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
  const userData = req.body;
}

export function httpCreateUser(req, res) {
  try {
    const newUser = req.body;
    const response = userService.createUser(newUser);
    return res.status(200).json({ token: response });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}
