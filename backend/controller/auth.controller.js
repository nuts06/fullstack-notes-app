import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const signup = async(req, res, next) =>{
    const {username, userEmail, password} = req.body

    const isValidUser = await User.findOne({email:userEmail})

    if(isValidUser){
        // console.log("User already exists!")
        return next(errorHandler(400, "User Already Exists"))
    }
}