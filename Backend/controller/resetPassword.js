import Otp from "../models/OtpSchema.js";
import { User } from "../models/UserSchema.js"
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

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

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).json({
                success: false,
                message: "Failed to send OTP"
            });
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({
                success: true,
                message: "Otp send successfully"
            });
        }
    });
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