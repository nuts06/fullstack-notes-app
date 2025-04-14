import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import NodeMailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config()


console.log("EMAIL auth:", process.env.EMAIL)
console.log("PASS auth:", process.env.PASS)

const otpStore = new Map()
const verifiedEmails = new Set();
// configuring my cred here
const transporter = NodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
    debug: true, // Enable debug logs
    logger: true, // Log to console
});

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        // Hash password and save user
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        console.log("New user to be saved:", newUser);

        await newUser.save();
        res.status(201).json({ message: "User Created Successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user: { id: user._id } }, // Wrap `id` inside `user` object
            process.env.JWT_SECRET, // Secret key (store in .env file)
            { expiresIn: "1h" } // Token expiration time
        );

        // Send token in response
        res.status(200).json({
            message: "Login successful",
            success: true,
            token, // Send token to frontend
            user: { id: user._id, name: user.name, email: user.email } // Send user details
        });

    } catch (error) {
        console.log("errror", error)
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const register = async (req, res) =>{
    const { email } = req.body;
    if(!email){
        return res.status(400).json({error: "Email is required"})
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists", success: false });
    }

    const otp = Math.floor(100000 + Math.random() * 900000 ).toString()
    const expiresAt = Date.now()+ 5 * 60 * 1000

    otpStore.set(email, {otp, expiresAt})

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}`
    
    };
    try{
        await transporter.sendMail(mailOptions)
        res.json({message: 'OTP sent' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error });
      }
}

// POST /api/auth/verify-otp
export const verifyOtp = (req, res) => {
    const { email, otp } = req.body;
  
    const stored = otpStore.get(email);
    if (!stored) {
      return res.status(400).json({ error: 'OTP not found for this email' });
    }
  
    const { otp: storedOtp, expiresAt } = stored;
  
    if (Date.now() > expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ error: 'OTP expired' });
    }
  
    if (otp !== storedOtp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
  
    // If OTP is correct, mark email as verified
    verifiedEmails.add(email); // You can use a Set or DB flag
    otpStore.delete(email);
  
    return res.json({ message: 'OTP verified successfully', success: true });
  };
  