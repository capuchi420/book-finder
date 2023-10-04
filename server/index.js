import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { dbRoutes } from './routes/db_routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/db', dbRoutes);

try{
    app.listen(process.env.PORT, () => {
        console.log(`Server running on https://localhost:${process.env.PORT}`);
        mongoose.connect(process.env.MONGO_URL).then(console.log('DB connected'));
    });
}catch(err){
    console.log(err);
}