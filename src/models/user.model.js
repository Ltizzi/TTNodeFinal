const admin = {
  id: 1,
  email: "admin@gmail.com",
  password: "12345",
  isAdmin: true,
};

const commonUser = {
  id: 2,
  email: "commonuser@gmail.com",
  password: "54321",
  isAdmin: false,
};

let lastId = 2;

const users = [admin, commonUser];

function getUserByEmail(email) {
  const user = users.filter((u) => u.email === email.toLowerCase())[0];
  if (user) return user;
  else throw new Error("User does not exists");
}

function checkIsAdmin(email) {
  const user = getUserByEmail(email);
  return user.isAdmin;
}

function authUser(userToAuth) {
  const user = getUserByEmail(userToAuth.email);
  if (
    user.email.toLowerCase() === userToAuth.email.toLowerCase() &&
    user.password === userToAuth.password
  )
    return { id: user.id, email: user.email };
  else throw new Error("Invalid credentials");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createUser(userToAdd) {
  if (!isValidEmail(userToAdd.email)) throw new Error("Invalid e-mail");

  lastId += 1;
  userToAdd.id = lastId;
  userToAdd.isAdmin = false;
  users.push(userToAdd);
  return { id: userToAdd.id, email: userToAdd.email };
}

export const userModel = {
  authUser,
  createUser,
  checkIsAdmin,
  getUserByEmail,
};
