import express from "express";
import { getAllBooks } from "../controllers/db_controller.js";

export const dbRoutes = express.Router();

dbRoutes.get('/getAllBooks', getAllBooks);