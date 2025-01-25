import mongoose, { Types } from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: {
        type: String,
        default: "https://res.cloudinary.com/dpsb0ysde/image/upload/v1721747774/job-search_cbwggp.png"
    },
    applied: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

export const Post = mongoose.model('Post',PostSchema)