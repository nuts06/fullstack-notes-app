import express from "express"
import { signup, verifyOtp } from "../controller/auth.controller.js"
import { login } from "../controller/auth.controller.js"
import { register } from "../controller/auth.controller.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post('/send-otp', register)
router.post('/verify-otp', verifyOtp)

export default router