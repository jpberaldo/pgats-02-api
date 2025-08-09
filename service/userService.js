const users = require('../model/userModel');

function findUserByLogin(login) {
  return users.find(u => u.login === login);
}

function registerUser({ login, password, name, favorecidos = [] }) {
  if (findUserByLogin(login)) {
    throw new Error('Usuário já existe');
  }
  const user = { login, password, name, favorecidos };
  users.push(user);
  return user;
}

function authenticateUser(login, password) {
  const user = findUserByLogin(login);
  if (!user || user.password !== password) {
    throw new Error('Login ou senha inválidos');
  }
  return user;
}

function getAllUsers() {
  return users.map(u => ({ login: u.login, name: u.name, favorecidos: u.favorecidos }));
}

module.exports = { findUserByLogin, registerUser, authenticateUser, getAllUsers };
