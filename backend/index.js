import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"

dotenv.config()

// mongodb connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongo db connected")
    console.log("Database Name:", mongoose.connection.db.databaseName);
}).catch((err)=>{
    console.log(err)
})

const app = express()

// to make input as json
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})

// import routes
app.use("/api/auth", authRouter)


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
