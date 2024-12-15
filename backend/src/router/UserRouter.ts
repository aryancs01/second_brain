import express from 'express'
import { ContentModel, LinkModel, TagModel, UserModel } from '../db';
import z from 'zod'
import { hashPassword } from '../utils/hashUtil';
import { compareUtil } from '../utils/compareUtil';
import { jwtUtil } from '../utils/jwtUtil';
import { middlewareUtil } from '../utils/middlewareUtil';
import { linkHashUtil } from '../utils/linkHashUtil';
import mongoose from 'mongoose';

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
    const {type,title,description,link,tag} = req.body

    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();

    const arrayTagIds = [];

    for(const getTag of tag){
        let tag = await TagModel.findOne({
            title:getTag
        })
        if(!tag){
            tag = await TagModel.create({
                title:getTag
            })
        }

        arrayTagIds.push(tag._id);
        
    }
    
    await ContentModel.create({
        type:type,
        title:title,
        link:link,
        description:description,
        userId:req.userId,
        tag:arrayTagIds,
        time:time,
        date:date
    })

    res.status(200).json({
        message:"Content Added"
    })
})

UserRouter.get("/content",middlewareUtil,async(req,res)=>{
    const response = await ContentModel.find({
        userId:req.userId
    })

    res.status(200).json({
        response
    })
})

UserRouter.delete("/content",middlewareUtil,async(req,res)=>{
    const contentId = req.body.contentId;

   await ContentModel.deleteOne({
        _id:contentId,
        userId:req.userId
    })

    res.status(200).json({
        message:"Content Deleted"
    })
})

UserRouter.get("/tag",middlewareUtil,async (req,res)=>{
    const response = await TagModel.findOne({
        _id:req.body.id
    })

    res.status(200).json({
        tag:response?.title
    })
})

UserRouter.post("/brain/share",middlewareUtil,async (req,res)=>{
    const share:boolean = req.body.share;

    if(share){
        const response = await LinkModel.findOne({
            userId:req.userId
        })

        if(!response){
            const isHash = await LinkModel.create({
                hash:linkHashUtil(),
                userId:req.userId
            })

            res.json({
                hash:isHash.hash
            })
        }else{
            res.json({
                hash:response.hash
            })
        }
    }else{
        const response = await LinkModel.deleteOne({
            userId:req.userId
        })

        res.json({
            message:"share link is deleted"
        })
    }
})

UserRouter.get("/brain/:sharelink",async (req,res)=>{
    const sharelink = req.params.sharelink

    const link = await LinkModel.findOne({
        hash:sharelink
    })

    if(!link){
        res.status(404).json({
            message:"No user found"
        })
        return;
    }

    const foundUser = await UserModel.findOne({
        _id:link.userId
    })

    const foundContent = await ContentModel.find({
        userId:link.userId
    })

    res.status(200).json({
        username:foundUser?.username,
        content:foundContent
    })

})

export default UserRouter;