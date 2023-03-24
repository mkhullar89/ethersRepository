import express from "express"
const rpcRouter=new express.Router()
import RPCController from "../Controller/RPCController.js"
const rpcController=new RPCController()
rpcRouter.post("/",rpcController.addRpc)

export default rpcRouter