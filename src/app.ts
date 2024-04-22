import  express  from "express";
const app=express()


// http methods: GET,POST,PUT,DELETE,PATCH
app.get("/",(req,res)=>{
res.json({message:"welcome to elibrary apis"})
})

export default app