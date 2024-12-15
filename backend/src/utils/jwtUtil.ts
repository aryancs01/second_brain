import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';


const jwt_secret: string | undefined = process.env.JWT_SECRET

export function jwtUtil(_id:mongoose.Types.ObjectId) {
    if(!jwt_secret){
    }else{
        return jwt.sign({
            id:_id
        },jwt_secret)
    }
   
}