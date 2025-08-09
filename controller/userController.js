const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

router.post('/register', (req, res) => {
  try {
    const user = userService.registerUser(req.body);
    res.status(201).json({ message: 'Usuário registrado com sucesso', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ error: 'Login e senha são obrigatórios' });
  }
  try {
    const user = userService.authenticateUser(login, password);
    res.json({ message: 'Login realizado com sucesso', user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(userService.getAllUsers());
});

module.exports = router;
