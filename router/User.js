import express from "express"
import UserController from "../Controller/UserController.js"
import {authenticationMiddleware} from "../middleawares/authentication.js"
const userController=new UserController()
const userRouter=express.Router()


userRouter.post("/",userController.registerAccount)
userRouter.post("/login",userController.login)
export default userRouter