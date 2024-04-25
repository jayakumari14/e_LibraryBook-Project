import  express,{Request,Response,NextFunction}  from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
const app=express()

app.use(express.json())


// http methods: GET,POST,PUT,DELETE,PATCH
app.get("/",(req,res,next)=>{
    
    res.json({message:"welcome to elibrary apis"})
})


app.use("/api/users",userRouter)
app.use("/api/books",bookRouter)
app.use(globalErrorHandler)

export default app