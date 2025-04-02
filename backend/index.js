import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"


// Loads environment variables from a .env file into process.env.
// Needed to securely store sensitive data like database credentials (MONGO_URI).
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



// global error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
    
})
