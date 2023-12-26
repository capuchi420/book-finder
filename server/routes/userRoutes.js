import express from 'express';
import { getUser, login, register } from '../controllers/user.js';

export const userRoutes = express.Router();

userRoutes.post('/login', login);
userRoutes.post('/register', register);
userRoutes.get('/getUser/:id', getUser);