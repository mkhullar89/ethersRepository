import { query } from "express"

class CommonModule{
    async findOne(model,query={},filter={}){
        try{
            const userData=await model.findOne(query,filter)
            if(userData){
                return {statusCode:200,status:"success",data:userData,message:"Record Found"}
            }else{
                return {statusCode:404,status:"failure",data:null,message:"No Record Found"}
            }
        }catch(err){
            console.log(err)
            console.log(err.name)
            console.log(err.message)
            return {statusCode:400,status:"failure",data:err,message,message:err.message}
        }
    }

    async createOne(model,body){
        try{
            const data=await model.create(body)
            return {statusCode:201,status:"success",data:data,message:"Record Added"}
        }catch(err){
            console.log(err)
            console.log(err.name)
            console.log(err.message)
            return {statusCode:400,status:"failure",data:err.message,message:err.message}
        }
    }

    async updateOne(model,data,filter){
        try{
            const data=await model.updateOne(filter,{$set:data})
            return {statusCode:200,status:"success",data:null,message:"Record Updated"}
        }catch(err){
            console.log(err.name)
            console.log(err.message)
            return {statusCode:400,status:"failure",data:err.message,message:err.message}
        }
    }

    async deleteOne(model,query={}){
        try{
            const data=await model.deleteOne(query)
            return {statusCode:200,status:"success",data:null,message:"Record Deleted"}
        }catch(err){
            console.log(err.name)
            console.log(err.message)
            return {statusCode:400,status:"failure",data:err.message,message:err.message}
        }
    }
    async doesDataExist(model,filter={}){
        const doesDataExist= await model.countDocuments(filter)
        if(doesDataExist){
            return true
        }else{
            return false
        }
    }
}
export default new CommonModule()