import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import connectdb from './config/db.js'
import userRoutes from './routes/userRoutes.js'



const app=express();

//config dotenv
dotenv.config();

const port=process.env.PORT
// /console.log(port)
const DATABASE_URL=process.env.DATABASE_URL

//database call
connectdb(DATABASE_URL);

//json
app.use(json());

// cors used
app.use(cors());

//load routes
app.use("/api/user",userRoutes)

app.listen(port,()=>{
    console.log(`Server running at https://localhost:${port}`);
})