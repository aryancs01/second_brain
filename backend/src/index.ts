declare global {
    namespace Express {
        export interface Request {
            userId?:string
        }
    }
}
import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import mongoose from 'mongoose';
import UserRouter from './router/UserRouter';
const app = express();

app.use("/user",UserRouter);

const port = process.env.PORT || 3000
const connectDatabase:string | undefined = process.env.DB_CONNECT;

async function main() {
    if(!connectDatabase){
        return;
    }else{
        await mongoose.connect(connectDatabase)
        .then(()=>console.log("database connected"))
        .catch(()=>console.log("error while connecting to database"))

        app.listen(process.env.PORT,()=>{
            console.log("listening at port "+port);
        })
    } 
}

main();