import { RequestHandler } from 'express';
import { users, User } from '../models/user.model';

export const getUsers: RequestHandler = (req, res) => {
  res.json(users);
};

export const getUserById: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const createUser: RequestHandler = (req, res) => {
  const { name, email } = req.body;
  const newUser: User = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  users[userIndex] = { id, name, email };
  res.json(users[userIndex]);
};

export const deleteUser: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const deleted = users.splice(index, 1)[0];
  res.json(deleted);
};
