import express from 'express';
import { addReading, addWantToRead, getUser, login, register, removeReading, removeWantToRead } from '../controllers/user.js';

export const userRoutes = express.Router();

userRoutes.post('/login', login);
userRoutes.post('/register', register);
userRoutes.get('/getUser/:id', getUser);
userRoutes.put('/addWantToRead', addWantToRead);
userRoutes.put('/addReading', addReading);
userRoutes.put('/removeWantToRead', removeWantToRead);
userRoutes.put('/removeReading', removeReading);