import mongoose from "mongoose"

const rpcSchema=new mongoose.Schema({
    name:{type:String,required:true},
    chainId:{type:Number,required:true},
    rpc:{type:String,required:true},
    symbol:{type:String,required:true},
    block_address:{type:String,required:true},
    createdOn:{type:Date,default:Date.now}

})
const rpcModel=new mongoose.model("rpcModel",rpcSchema)
export default rpcModel