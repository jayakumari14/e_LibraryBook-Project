import { NextFunction,Request,Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser=async(req:Request,res:Response,next:NextFunction)=>{   
    const {name,email,password}=req.body
    // validation
    if(!name||!email||!password){
        const error=createHttpError(400,"All fields are required")
        return next(error)
    }


    // Database call
    try {
      const user=await userModel.findOne({email})
      if(user){
        const error=createHttpError(400,"User already exists with this email")
        return next(error)
        }
       } catch (err) {
       return next(createHttpError(500,"Error while getting user"))
       }
      

    ///password--> hash
     let newUser:User

    const hashedPassword=await bcrypt.hash(password,10);
    try {
      newUser=await userModel.create({
      name,
      email,
      password:hashedPassword,
     })
    } 
    catch (err) {
      return next(createHttpError(500,"Error while creating user"))
        }

    // Token generation,JWT tokens

    try {
    const token= sign({sub:newUser._id}, config.jwtSecret as string,{
        expiresIn:'7d',
        algorithm:"HS256",
    })
    // response
    res.status(201).json({accessToken:token});
    }catch (err) {
    return next(createHttpError(500,"Error while signing the jwt token"));
    }
}   


// ///////  LOGIN USER   ////////////////
const loginUser=async(req:Request,res:Response,next:NextFunction)=>{
    const {email,password}=req.body
    if(!email||!password){
        return next(createHttpError(400, "All fields are required"))
    }
   
     // todo: wrap in try catch.
     
    const user=await userModel.findOne({email})
     if(!user){
        return next(createHttpError(404,"user not found"))
      }

   const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return next(createHttpError(400,"UserName or password incorrect"))
        }
   
// create access token

    const token= sign({sub:user._id}, config.jwtSecret as string,{
        expiresIn:'7d',
        algorithm:"HS256",
    })
    res.json({accessToken:token});
};
     

export  {createUser,loginUser}