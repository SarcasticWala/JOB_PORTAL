import { Otp } from "../models/OtpSchema.js"
import { User } from "../models/UserSchema.js"
import bcrypt from 'bcrypt'


const verifyEmail = async (req, res) => {   
    const { email } = req.body
    console.log(email)

    const user = await User.findOne({email: email})
    if(!user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    const otp = Math.round(Math.random() * 1000000)
    await Otp.create({ otp: otp, email: email })
    return res.status(200).json({
        success: true,
        message: "Otp send successfully"
    })
}

const verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body

        const otpD = await Otp.find({ email: email }).sort({ createdAt: -1 }).limit(1)
        if (otpD[0].otp != otp) {
            return res.status(401).json({
                success: false,
                message: "Otp is incorrect"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Otp is correct"
        })
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async(req,res) => {
    try {
        const {new_pass, email} = req.body
        
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Email not found"
            })
        }

        const hashedPassword = await bcrypt.hash(new_pass,10)
        user.password = hashedPassword
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password reset"
        })

    } catch (error) {
        console.log(error)
    }
}

export {verifyEmail, verifyOtp, resetPassword}