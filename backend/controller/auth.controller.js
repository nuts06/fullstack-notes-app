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
        console.log("User saved successfully.");
        res.status(201).json({ message: "User Created Successfully", success: true });
    } catch (err) {
        console.error("Error in signup:", err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        console.log("User found:", user);

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
            user: { id: user._id, name: user.name || '', email: user.email } // Send user details
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
    let existingUser = await User.findOne({ email });
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
        html: `
        <html>
        <body>
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
                <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <h2 style="color: #333;">Greetings!!</h2>
                    <p style="font-size: 16px;">Use the OTP below to complete your verification process:</p>
                    <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px; background-color: #f0f0f0; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p style="font-size: 14px; color: #555;">This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
                    <p style="margin-top: 30px;">Thanks & regards,<br><strong>VenusVibes</strong></p>
                </div>
            </div>
        </body>
        </html>
    `
    
    };
    try{
        await transporter.sendMail(mailOptions)
        res.json({message: 'OTP sent', otp })
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error });
      }
}


export const verifyOtp = async (req, res) => {
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

    try {
        // ✅ Find user by email
         const newUser = new User({ email });
        await newUser.save();

        // ✅ Mark email as verified (if needed)
        verifiedEmails.add(email);
        otpStore.delete(email);

        return res.json({
            message: 'OTP verified successfully',
            success: true,
            userId: newUser._id, // 👈 Send userId to frontend
        });
    } catch (err) {
        console.error('Error verifying OTP:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const personalDetails = async (req, res) => {
    try {
        const { userId, name, password, repassword, contact, country, state, city, postalcode } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (password !== repassword) {
            return res.status(400).json({ message: "Passwords do not match", success: false });
        }

        const updatedPassword = bcrypt.hashSync(password, 10);
        user.name = name || user.name;
        user.contact = contact || user.contact;
        user.country = country || user.country;
        user.state = state || user.state;
        user.city = city || user.city;
        user.postalcode = postalcode || user.postalcode;
        user.password = updatedPassword;

        await user.save();

        res.status(200).json({ message: "Personal details updated successfully", success: true,  user: {
            id: user._id,
            name: user.name,
          } });

    } catch (error) {
        console.error("Error updating personal details:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


export const getPersonalDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("User ID from params:", userId);

        if (!userId) {
            return res.status(400).json({ message: "User ID is required", success: false });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({
            message: "Personal details fetched successfully",
            success: true,
            user: {
                id: user._id,
                email:user.email,
                contact: user.contact,
                country: user.country,
                state: user.state,
                city: user.city,
                postalcode: user.postalcode,
            }
        });

    } catch (error) {
        console.error("Error fetching personal details:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword, confirmPassword } = req.body;

        if (!userId || !currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New passwords do not match", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect", success: false });
        }

        // Hash and update new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.updateOne(
        { _id: userId },
        { $set: { password: hashedPassword } }
        );

        // Optional: log to check if update worked
        const updatedUser = await User.findById(userId);
        console.log("Updated password hash:", updatedUser.password);


        return res.status(200).json({ message: "Password reset successful", success: true });
    } catch (err) {
        console.error("Error in resetPassword:", err);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
