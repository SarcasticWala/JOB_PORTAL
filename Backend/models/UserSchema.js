import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    accountType: {
        type: String,
        enum: ["employee","hr"]
    },
    image: String,
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    resume: String,
    apply: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
})

let User;
try {
    User = mongoose.model('User');
} catch (error) {
    User = mongoose.model('User', UserSchema);
}

export { User };