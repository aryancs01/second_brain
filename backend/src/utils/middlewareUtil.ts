import dotenv from 'dotenv'
dotenv.config()
import { Request, Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const jwt_secret: string | undefined = process.env.JWT_SECRET

export function middlewareUtil(req:Request,res:Response,next:NextFunction){
    const header = req.headers["authorization"]
    if(!jwt_secret){
    }else{
        const decodeValue = jwt.verify(header as string,jwt_secret) as JwtPayload;
        if(decodeValue){
            req.userId = decodeValue.id
            next();
        }else{
            res.status(404).json({
                message:"JWT token not found!"
            })
        }
    }
    
}