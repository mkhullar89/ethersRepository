import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    PAN:{type:String,default:null},
    AADHAAR:{type:String,default:null}
})
const userModel=new mongoose.model("userModel",userSchema)
export default userModel