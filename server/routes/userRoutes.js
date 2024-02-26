import express from 'express';
import { addFavForum, addRead, addReading, addWantToRead, getUser, login, register, removeFavForum, removeRead, removeReading, removeWantToRead } from '../controllers/user.js';

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
userRoutes.put('/addRead', addRead);
userRoutes.put('/removeRead', removeRead);