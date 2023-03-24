import commonModule from "../common/common.js";
import rpcModel from "../models/JsonRPC.js";
import utilsModule from "../utils/Utils.js";

class RPCController{
    async addRpc(req,res){
        try{
            const{
    body:{name,chainId,rpc,symbol,block_address}
            }=req
            const isNameExist=await commonModule.findOne(rpcModel,{name})
            const ischainIdExist=await commonModule.findOne(rpcModel,{chainId})
            const isrpcExist=await commonModule.findOne(rpcModel,{rpc})
            const issymbolExist=await commonModule.findOne(rpcModel,{symbol})
            const blockAddressExist=await commonModule.findOne(rpcModel,{block_address})
            console.log(isNameExist.data)
            if(isNameExist?.data){
                return utilsModule.responseHandler(res,{statusCode:405,status:"failure",message:"Name Already Taken",data:null})
            }else if(ischainIdExist?.data){
                return utilsModule.responseHandler(res,{statusCode:405,status:"failure",message:"ChainId Already Taken",data:null}) 
            }else if(isrpcExist?.data){
                return utilsModule.responseHandler(res,{statusCode:405,status:"failure",message:"RPC Already Taken",data:null}) 
            }else if(issymbolExist?.data){
                return utilsModule.responseHandler(res,{statusCode:405,status:"failure",message:"Symbol Already Taken",data:null}) 
            }else if(blockAddressExist?.data){
                return utilsModule.responseHandler(res,{statusCode:405,status:"failure",message:"Block Address Already Taken",data:null}) 
            }else{
                //new One
                const rpcData=await commonModule.createOne(rpcModel,req.body)
                return utilsModule.responseHandler(res,{statusCode:405,status:"failure",message:"RPC Added Successfully",data:rpcData})
            }
        }catch(err){

        }
    }
}
export default RPCController