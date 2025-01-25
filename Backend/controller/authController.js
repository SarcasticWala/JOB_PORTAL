import { User } from "../models/UserSchema.js";
import { Otp } from "../models/OtpSchema.js"
import bcrypt from 'bcrypt'
import { Profile } from "../models/ProfileSchema.js";
import jwt from "jsonwebtoken"


const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User already logged in"
            })
        }
        else {
            const otp = Math.round(Math.random() * 1000000)
            await Otp.create({ otp: otp, email: email })
            return res.status(200).json({
                success: true,
                message: "Otp send successfully"
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}


const signup = async (req, res) => {
    try {
        console.log(req.body)
        const { firstName, lastName, email, password, accountType, otp } = req.body
        if (!firstName || !lastName || !email || !password || !accountType || !otp) {
            return res.status(401).json({
                success: false,
                message: "All field are required"
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User already logged in"
            })
        }
        const otpD = await Otp.find({ email: email }).sort({ createdAt: -1 }).limit(1)
        console.log(otpD)
        if (otpD[0].otp != otp) {
            return res.status(403).json({
                success: false,
                message: "Otp is not correct"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const profileDetails = await Profile.create({ DOB: null, gender: null, about: null, contact: null })
        await User.create({ firstName: firstName, lastName: lastName, email: email, resume: null, password: hashedPassword, accountType: accountType, additionalDetails: profileDetails._id, image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`})

        return res.status(200).json({
            success: true,
            message: "Account created successfully"
        })
    } catch (error) {
        console.log(error)
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await User.findOne({ email: email }).populate("additionalDetails")
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not signed in"
            })
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            })
        }
        
        const payload = {
            email: email,
            id: user._id,
            accountType: user.accountType
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "30d"
        })
        const options = {
            httpOnly: true,
            expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
        }

        user.password = undefined

        return res.cookie("token", token, options).status(200).json({
            success: true,
            message: "Logged in successfully",
            user,
            token,
        })


    } catch (error) {
        console.log(error)
    }
}


const logout = async (req, res) => {
    res.clearCookie("token", { path: '/' })
    return res.status(200).json({
        success: true,
        message: "Logged out Succesfully"
    })
}


const changePassword = async (req, res) => {
    try {
        const  user_id  = req.user.id
        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const { old_pass, new_pass } = req.body
        const user = await User.findById({ _id: user_id })

        const response = await bcrypt.compare(old_pass, user.password)
        if (!response) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            })
        }
        console.log(response)

        const hashedPassword = await bcrypt.hash(new_pass, 10)
        user.password = hashedPassword
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password update successfully"
        })

    } catch (error) {
        console.log(error)
    }
}


export { sendOtp, signup, login, logout, changePassword }