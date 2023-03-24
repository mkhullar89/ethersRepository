import mongoose from "mongoose"

const userAccountSchema=new mongoose.Schema({
    user_id:{type:mongoose.Types.ObjectId,required:true,ref:"userModels"},
    account_address:{type:String,required:true},
    account_privateKey:{type:String,required:true},
    account_publicKey:{type:String,required:true},
    account_name:{type:String,required:true},
    account_index:{type:Number,required:true},
    account_mnemonic:{type:String,required:true}
})
const userAccountModel=new mongoose.model("userAccountModel",userAccountSchema)
export default userAccountModel