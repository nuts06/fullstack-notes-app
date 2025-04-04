import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
            { id: user._id, email: user.email }, // Payload
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