import  express,{Request,Response,NextFunction}  from "express";

import globalErrorHandler from "./middlewares/globalErrorHandler";
const app=express()


// http methods: GET,POST,PUT,DELETE,PATCH
app.get("/",(req,res,next)=>{
    
    res.json({message:"welcome to elibrary apis"})
})


app.use(globalErrorHandler)

export default app