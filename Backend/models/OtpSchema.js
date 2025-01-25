import mongoose, { Types } from "mongoose";
import mailsender from "../utils/mailsender.js";

const OtpSchema = new mongoose.Schema({
    otp: Number,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


// send mail
const sendVerificationMail = async(email, otp) =>{
    try {
        const response = await mailsender(email,"Verification email from JobSeeker",`<p>Your otp is => ${otp}</p>`)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

OtpSchema.pre('save', async function(next){
    
    await sendVerificationMail(this.email, this.otp)
    next()
})

export const Otp = mongoose.model('Otp',OtpSchema)


Otp.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2000 });