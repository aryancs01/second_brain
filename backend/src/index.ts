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
const app = express();

app.listen(3000,()=>{
    console.log("listening at 3000");
});