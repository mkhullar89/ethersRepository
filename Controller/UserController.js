import ethers, { utils } from "ethers"
import userModel from "../models/User.js"
import commonModule from "../common/common.js"
import utilsModule from "../utils/Utils.js"
import rpcModel from "../models/JsonRPC.js"
import userAccountModel from "../models/UserAccount.js"
class UserController {
    async InitializeNet(net){
        const rpcNetworkData=await commonModule.findOne(rpcModel,{net})
        return rpcNetworkData
    }
    async registerAccount(req, res) {
        //find the user account with mail
        const {
            body: {email}
        }=req
        const userData=await commonModule.findOne(userModel,{email},{password:0,_id:0,PAN:0,AADHAAR:0,firstName:0,lastName:0})
        if(userData){
            //user found
            userData.status="failure"
            return utilsModule.responseHandler(res,userData)
        }else{
            //create user Account
             const account=ethers.Wallet.createRandom()
             req.body.password=await utilsModule.encryptPassword(req.body.password)
             await commonModule.createOne(userModel,req.body)
             const userData=await commonModule.findOne(userModel,{email:email},{password:0})
             if(userData?.data){
                const privateKey=await utilsModule.encryptData(account.privateKey)
                const publicKey=await utilsModule.encryptData(account.publicKey)
                const mnemonic=await utilsModule.encryptData(account.mnemonic.phrase)
                
                const result=await commonModule.createOne(userAccountModel,{
                    user_id:userData.data._id,
                    account_privateKey:privateKey,
                    account_publicKey:publicKey,
                    account_name:"Account0",
                    account_index:0,
                    account_mnemonic:mnemonic,
                    account_address:account.address
                })
                return utilsModule.responseHandler(res,result)
             }else{
                return utilsModule.responseHandler(res,userData.data)
             }
        }
    }

    async login(req,res){
        const{
            body:{email,password}
        }=req
        //verify the mail
        const isEmailinDB=await commonModule.doesDataExist(userModel,{email})
        if(isEmailinDB){
            //verify password
            const userData=await commonModule.findOne(userModel,{email})
            const isPasswordCorrect=await utilsModule.verifyPassword(password,userData?.data?.password)
            if(isPasswordCorrect){
                //generate the tokens
                
                const access_token=await utilsModule.generateAccessToken(userData.data._id)
                const refresh_token=await utilsModule.generateRefreshToken(userData.data.email)
                return utilsModule.responseHandler(res,{statusCode:200,status:"success",message:"Login Successfull",data:{access_token,refresh_token}})
            }else{
                return utilsModule.responseHandler(res,{statusCode:405,status:"failure",message:"Password Incorrect",data:null})
            }
        }else{
            return utilsModule.responseHandler(res,{statusCode:405,status:"failure",message:"No Record Found",data:null})
        }
    }

    //create New Account in Existing email
    async createAccount(){
        
    }
}

export default UserController