import express from 'express';
import { addFavForum, addReading, addWantToRead, getUser, login, register, removeFavForum, removeReading, removeWantToRead } from '../controllers/user.js';

export const userRoutes = express.Router();

userRoutes.post('/login', login);
userRoutes.post('/register', register);
userRoutes.get('/getUser/:id', getUser);
userRoutes.put('/addWantToRead', addWantToRead);
userRoutes.put('/addReading', addReading);
userRoutes.put('/removeWantToRead', removeWantToRead);
userRoutes.put('/removeReading', removeReading);
userRoutes.put('/addFavForum', addFavForum);
userRoutes.put('/removeFavForum', removeFavForum);