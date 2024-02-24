import express from "express";
import { getAForum, getAllForums } from "../controllers/forum.js";

export const forumRoutes = express.Router();

forumRoutes.get('/getAllForums', getAllForums);
forumRoutes.get('/getAForum/:_id', getAForum);
