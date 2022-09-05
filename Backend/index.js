import express from 'express';

import router from './Routers/Router.js';
import dotenv from 'dotenv';
import connectDb from './config/DB.js';
dotenv.config();

const app = express();
app.use(express.json())
connectDb();
import cors from 'cors';
app.use(cors({
    origin: 'https://localhost:5000'
}));
app.use(router);

app.listen(process.env.PORT);
