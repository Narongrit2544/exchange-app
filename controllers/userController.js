const { User } = require('../models');

const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

const createUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.status(201).json(user);
};

module.exports = { getUsers, createUser };
