import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   email:{
    type:String,
    required:true,
    unique:true
   },
   username:{
    type:String,
    required:true,
   },
   password:{
    type:String,
    required:true,
   }
})

const ContentSchema = new mongoose.Schema({
   type:{
    type:String,
    enum:["youtube","twitter","note"],
    required:true
   },
   title:String,
   description:String,
   date:String,
   time:String,
   userId:{type:mongoose.Types.ObjectId,ref:"users"},
   tag:[{type:mongoose.Types.ObjectId,ref:"tags"}]
 })

 const TagSchema = new mongoose.Schema({
    title:String,
 })

 const LinkSchema = new mongoose.Schema({
    hash:String,
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"users",
    }
 })

export const UserModel = mongoose.model("users",UserSchema);
export const ContentModel = mongoose.model("contents",ContentSchema);
export const TagModel = mongoose.model("tags",TagSchema);
export const LinkModel = mongoose.model("links",LinkSchema);