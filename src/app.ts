import  express,{Request,Response,NextFunction}  from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
const app=express()

app.use(express.json())


// http methods: GET,POST,PUT,DELETE,PATCH
app.get("/",(req,res,next)=>{
    
    res.json({message:"welcome to elibrary apis"})
})


app.use("/api/users",userRouter)
app.use(globalErrorHandler)

export default app