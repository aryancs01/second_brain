import express from 'express'
import { UserModel } from '../db';
import z from 'zod'
import { hashPassword } from '../utils/hashUtil';
import { compareUtil } from '../utils/compareUtil';
import { jwtUtil } from '../utils/jwtUtil';
import { middlewareUtil } from '../utils/middlewareUtil';

const UserRouter = express.Router();

UserRouter.use(express.json())

UserRouter.post("/signup",async (req,res)=>{
    const requiredBody = z.object({
        email:z.string().min(3).max(70).email(),
        username:z.string().min(3).max(50),
        password:z.string().min(3).max(50)
    })

    const parseData = requiredBody.safeParse(req.body);

    if(!parseData.success){
        res.status(400).json({
            message:"Incorrect format",
            status:false
        })
        return;
    }

    const isUserSignup = await UserModel.findOne({
        email:req.body.email,
    })

    if(isUserSignup){
        res.json({
            message:"User already register",
            status:true
        })
    }else{
        const hashPass =await hashPassword(req.body.password)
        await UserModel.create({
            email:req.body.email,
            username:req.body.username,
            password:hashPass
        })

        res.status(200).json({
            message:"User is Signup",
            status:true
        })
    }
})

UserRouter.post("/signin",async (req,res)=>{
    const {email,password} = req.body;

    const findUser = await UserModel.findOne({
        email:email
    })

    if(!findUser){
        res.status(404).json({
            message:"User not Found",
            status:false
        })
        return;
    }else{
        const comparePassword =await compareUtil(password,findUser.password);

        if(comparePassword){
            const token = jwtUtil(findUser._id)
            if(!token){
                return;
            }else{
                res.status(200).json({
                    message:"User Signin",
                    token:token
                })
            }
        }else{
            res.status(403).json({
                message:"Invalid Credentials"
            })
        }
    }
})

UserRouter.post('/content',middlewareUtil,async(req,res)=>{
    
})

export default UserRouter;