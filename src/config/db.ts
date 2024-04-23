import mongoose from "mongoose";
import { config } from "./config";

const connectDB=async()=>{

    try {
        mongoose.connection.on('connected',()=>{
            console.log("connected to db successfully");
            
          })
    
          mongoose.connection.on("error",(err)=>{
            console.log("error in connecting to db",err);
            
          })
          
      await  mongoose.connect(config.databaseUrl as string)

      
      
    } catch (err) {
        console.error("failed to connect to db",err);    
        process.exit(1)    
    }

}

export default connectDB;