import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import rpcRouter from "./router/RPCrouter.js"
import userRouter from "./router/User.js"
dotenv.config()
const app=express()
app.use(express.json())
app.use("/user",userRouter)
app.use("/rpc",rpcRouter)
app.listen(process.env.SERVER_PORT,(err)=>{
    if(err){
        console.log(err)
    }else{
        mongoose.connect(process.env.DB_URI)
        console.log("Connected to Database")
        console.log("Connected to Server")
    }
})
