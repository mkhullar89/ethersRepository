import bcrypt from "bcrypt"
import Cryptr from "cryptr"
import jwt from "jsonwebtoken"
class UtilsModule{
    async responseHandler(res,mssgBody){
        res.status(mssgBody.statusCode).json({status:mssgBody.status,message:mssgBody.message,data:mssgBody.data})
    }

    async encryptPassword(password){
        const encryptedPassword=bcrypt.hashSync(password,parseInt(process.env.SALT_ROUNDS))
        return encryptedPassword
    }

    async encryptData(data){
        const cryptr=new Cryptr(process.env.CRYPTR_SECRET)
        const encryptedData=cryptr.encrypt(data)
        console.log("Decrypted Data",cryptr.decrypt(encryptedData))
        return encryptedData
    }

    async verifyPassword(password,encryptedPassword){
        const isPasswordCorrect=bcrypt.compareSync(password,encryptedPassword)
        return isPasswordCorrect
    }

    async generateAccessToken(secretId){
        const cryptr=new Cryptr(process.env.CRYPTR_SECRET)
        const access_token= jwt.sign({secret:secretId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30s"})
        const encryptedAccessToken=cryptr.encrypt(access_token)
        return encryptedAccessToken
    }
    async generateRefreshToken(secretEmail){
        const cryptr=new Cryptr(process.env.CRYPTR_SECRET)
        const refresh_token= jwt.sign({secret:secretEmail},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"50s"})
        const encryptedRefreshToken=cryptr.encrypt(refresh_token)
        return encryptedRefreshToken 
    }

}

export default new UtilsModule()