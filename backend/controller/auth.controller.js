import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"

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

export const login = async(req, res) => {
    const {email, password} = req.body

    // check if user exists
    const user = await User.findOne({email})
    if(user){
        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            res.status(200).json({message:"Login Success", success:true})
        }
        else{
            res.status(400).json({message:"invalid credentials", success:false})
        }
    }
    else{
        res.status(400).json({message:"User not found", success:false})
    }
}
