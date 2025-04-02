import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"


// we have to config the dotenv before using it
dotenv.config()


// mongodb connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongo db connected")
}).catch((err)=>{
    console.log(err)
})


const app = express()

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})