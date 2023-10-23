import express from "express";
import { getAllBooks, getABook } from "../controllers/db_controller.js";

export const dbRoutes = express.Router();

dbRoutes.get('/getAllBooks', getAllBooks);
dbRoutes.get('/getABook/:_id', getABook);