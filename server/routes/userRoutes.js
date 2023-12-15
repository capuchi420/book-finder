import express from 'express';
import { login, register } from '../controllers/user.js';

export const userRoutes = express.Router();

userRoutes.post('/login', login);
userRoutes.post('/register', register);