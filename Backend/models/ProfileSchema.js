import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    DOB: String,
    gender: String,
    about: String,
    contact: Number
})

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;