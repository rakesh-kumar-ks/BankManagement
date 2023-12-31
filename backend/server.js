import express from 'express';
import dotenv from 'dotenv';
 import cors from 'cors';
dotenv.config();
const port= process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connetDB from './config/db.js';
import cookieParser from 'cookie-parser';

connetDB();

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(cookieParser())

app.use('/api/users', userRoutes);

app.get('/',(req,res)=>res.send('Server is Ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server Starts On Port number ${port}`));