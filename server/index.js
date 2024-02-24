import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { dbRoutes } from './routes/db_routes.js';
import { userRoutes } from './routes/userRoutes.js';
import bodyParser from 'body-parser';
import { forumRoutes } from './routes/forumRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));*/

app.use('/db', dbRoutes);
app.use('/user', userRoutes);
app.use('/forum', forumRoutes);

try{
    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
        mongoose.connect(process.env.MONGO_URL).then(console.log('DB connected'));
    });
}catch(err){
    console.log(err);
}