import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // 5 minutes
    }
})

const Otp = mongoose.model('Otp', otpSchema)

export default Otp