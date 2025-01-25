import { Post } from '../models/PostSchema.js'
import imageupload from '../utils/imageupload.js'
import { User } from '../models/UserSchema.js';
import imagedelete from '../utils/imagedelete.js';


const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const post_image = req.files?.post_image;

        const user_id = req.user.id;
        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        if (!title || !description) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        let response;
        if (post_image) {
            response = await imageupload(post_image, "post_image", 1000)
        }
        const image_url = response?.secure_url;

        const post = await Post.create({ title: title, description: description })

        if (image_url) {
            post.imageUrl = image_url;
            await post.save();
        }

        await User.findByIdAndUpdate({ _id: user_id }, { $push: { posts: post._id } })

        return res.status(200).json({
            success: true,
            message: "Post created successfully",
            post
        })

    } catch (error) {
        console.log(error)
    }
}


const editPost = async (req, res) => {
    try {
        const { title, description, post_id } = req.body
        const post_image = req.files?.post_image

        const user_id = req.user.id;
        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        let response;
        if (post_image) {
            response = await imageupload(post_image, "post_image", 1000)
        }
        const image_url = response?.secure_url;

        let post;
        if (title || description) {
            post = await Post.findByIdAndUpdate({ _id: post_id }, { title: title, description: description }, { new: true })
        }

        if (image_url) {
            post.imageUrl = image_url
            await post.save()
        }

        return res.status(200).json({
            success: true,
            message: "post edited successfully",
            post
        })
    } catch (error) {
        console.log(error)
    }
}


const deletePost = async (req, res) => {  
    try {
        const { post_id } = req.body
        const user_id = req.user.id

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        const post = await Post.findByIdAndDelete({ _id: post_id })
        await User.findByIdAndUpdate({ _id: user_id }, { $pull: { posts: post_id } })

        post?.applied?.forEach(async (apply_user_id) => {
            await User.findByIdAndUpdate({ _id: apply_user_id }, { $pull: { apply: post_id } })
        })


        const image_url = post.imageUrl
        if (image_url != "https://res.cloudinary.com/dpsb0ysde/image/upload/v1721747774/job-search_cbwggp.png") {
            const response = await imagedelete(image_url, "post_image")
            console.log(response)
        }

        const user = await User.findById({ _id: user_id }).populate("posts")

        return res.status(200).json({
            success: true,
            message: "post deleted successfully",
            user
        })
    } catch (error) {
        console.log(error)
    }
}


const applyPost = async (req, res) => {
    try {
        const { post_id } = req.body
        const user_id = req.user.id

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        await Post.findByIdAndUpdate({ _id: post_id }, { $push: { applied: user_id } })

        await User.findByIdAndUpdate({ _id: user_id }, { $push: { apply: post_id } })

        return res.status(200).json({
            success: true,
            message: "Applied in post Succesfully"
        })
    } catch (error) {
        console.log(error)
    }
}


const getPostDetails = async (req,res) => {
    try {
        const {post_id} = req.body
        if(!post_id){
            return res.status(401).json({
                success: false,
                message: "Post not found"
            })
        }

        const post_details = await Post.findOne({_id: post_id})
        return res.status(200).json({
            success: true,
            message: "Post found succesfully",
            post_details
        })

    } catch (error) {
        console.log(error)   
    }
}


const getAllPost = async (req,res) => {
    try {
        const All_post_details = await Post.find({})
        if(!All_post_details){
            return res.status(401).json({
                success: false,
                message: "No post",
            })
        }

        return res.status(200).json({
            success: true,
            message: "All post get succesfully",
            All_post_details
        })
    } catch (error) {
        console.log(error)
    }
}


export { createPost, editPost, deletePost, applyPost, getPostDetails, getAllPost }