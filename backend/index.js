import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

// we have to config the dotenv before using it
dotenv.config()

const app = express()

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})