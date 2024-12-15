import express from 'express'
import { UserModel } from '../db';

const UserRouter = express.Router();

UserRouter.use(express.json())

UserRouter.get("/signup",(req,res)=>{

})

export default UserRouter;