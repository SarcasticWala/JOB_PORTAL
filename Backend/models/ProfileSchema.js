import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    DOB: String,
    gender: String,
    about: String,
    contact: Number
})

export const Profile = mongoose.model('Profile',ProfileSchema)