import { User } from '../models/UserSchema.js'
import { Profile } from '../models/ProfileSchema.js'
import imageupload from '../utils/imageupload.js'
import { Post } from '../models/PostSchema.js'


const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, DOB, gender, about, contact } = req.body
        const user_id = req.user.id
        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        let user = await User.findById(user_id)
        const user_profile = await Profile.findById(user.additionalDetails)

        
        if (DOB || gender || about || contact) {
            user_profile.DOB = DOB
            user_profile.gender = gender
            user_profile.about = about
            user_profile.contact = contact

            await user_profile.save();
        }

        if (firstName || lastName) {
            user = await User.findByIdAndUpdate({_id:user_id},{firstName:firstName, lastName:lastName},{new:true}).populate("additionalDetails")
        }
        else{
            user = await User.findById({_id:user_id}).populate("additionalDetails")
        }

        user.password = undefined
        return res.status(200).json({
            success: true,
            message: "Profile update successfully",
            user: user
        })

    } catch (error) {
        console.log(error)
    }
}


const updateImage = async (req, res) => {
    try {
        const image = req.files.image
        const user_id = req.user.id
        const response = await imageupload(image, "profile_images", 1000)
        const image_url = response.secure_url

        const user = await User.findByIdAndUpdate({ _id: user_id }, { image: image_url }, { new: true })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not found"
            })
        }

        user.password = undefined
        return res.status(200).json({
            success: true,
            message: "image upload successfully",
            user: user
        })

    } catch (error) {
        console.log(error)
    }
}


const updateResume = async (req, res) => {      
    try {
        const resume = req.files.resume
        if (!resume) {
            res.status(401).json({
                success: false,
                message: "Resume not uploaded"
            })
        }
        
        const response = await imageupload(resume, "profile_resume")
        const resume_url = response.secure_url
        const user_id = req.user.id
        const user = await User.findByIdAndUpdate({ _id: user_id }, { resume: resume_url }, { new: true })
        
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        user.password = undefined
        return res.status(200).json({
            success: true,
            message: "resume upload successfully",
            user: user
        })

    } catch (error) {
        console.log(error)
    }
}


const deleteProfile = async (req,res) => {
    try {
        const user_id = req.user.id
        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const user_type = req.user.accountType
        if(user_type == "employee"){
            const user = await User.findById({_id: user_id})
            const applied_post_ids = user.apply

            applied_post_ids.forEach(async(applied_post_id) => {
                await Post.findByIdAndUpdate({_id: applied_post_id},{$pull:{applied: user_id}})
            });
            
            const profile_id = user.additionalDetails
            await Profile.findByIdAndDelete({_id: profile_id})
            
            await User.findByIdAndDelete({_id: user_id})

            for (let cookie in req.cookies) {
                res.clearCookie(cookie, { path: '/' });
            }

            return res.status(200).json({
                success: true,
                message: "Employee Profile Deleted"
            })
        }
        
        if(user_type == "hr"){
            const user = await User.findById({_id: user_id})
            const post_ids = user.posts

            post_ids.forEach(async(post_id) => {
                const post = await Post.findById({_id: post_id})

                console.log(post)
                post.applied.forEach(async(user_id) => {
                    console.log(user_id)
                    await User.findByIdAndUpdate({_id: user_id}, {$pull:{apply: post_id}})
                })

                await Post.findByIdAndDelete({_id: post_id})
            });


            const profile_id = user.additionalDetails
            await Profile.findByIdAndDelete({_id: profile_id})

            await User.findByIdAndDelete({_id: user_id})

            for (let cookie in req.cookies) {
                res.clearCookie(cookie, { path: '/' });
            }

            return res.status(200).json({
                success: true,
                message: "HR Profile Deleted"
            })
        }

        return res.status(401).json({
            success: false,
            message: "Profile not deleted"
        })
    } catch (error) {
        console.log(error)
    }
}


const getUserDetails = async (req,res) => {
    try {
        const user_id = req.user.id
        if(!user_id){
            return res.status(401).json({
                success: true,
                message: "User not found"
            })
        }

        const user_details = await User.findOne({_id: user_id}).populate("additionalDetails")     

        return res.status(200).json({
            success: true,
            message: "User details get succesfully",
            user_details
        })

    } catch (error) {
        console.log(error)
    }
}


const getApplyPost = async (req,res) => {
    try {
        const user_id = req.user.id
        if(!user_id){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const user = await User.findOne({_id: user_id}).populate("apply")
        if(user.apply.length == 0){
            return res.status(401).json({
                success: false,
                message: "Not applied in any post"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Get post where user apply",
            user
        })

    } catch (error) {
        console.log(error)
    }
}


const getMyPosts = async (req,res) => {
    try {
        const user_id = req.user.id
        if(!user_id){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const user = await User.findOne({_id: user_id}).populate("posts")
        if(user.posts.length == 0) {
            return res.status(401).json({
                success: false,
                message: "User not post anything"
            })
        }    

        return res.status(200).json({
            success: true,
            message: "Get posts of user",
            user
        })

    } catch (error) {
        console.log(error)
    }
}


const getAppliedUsers = async (req,res) => {
    try {
        const user_id = req.user.id
        const {post_id} = req.body

        if(!user_id){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const user = await User.findOne({_id: user_id})
        if(user.posts.length == 0){
            return res.status(401).json({
                success: false,
                message: "No posts are posted"
            })
        }

        if(!user.posts.includes(post_id)){
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            })
        }
        

        const post = await Post.findOne({_id: post_id}).populate({path:"applied",populate:{path:"additionalDetails"}})
        
        return res.status(200).json({
            success: true,
            message: "Get users who applied on the post",
            post
        })        

    } catch (error) {
        console.log(error)
    }
}

export {updateProfile, updateImage, updateResume, deleteProfile, getUserDetails, getApplyPost, getMyPosts, getAppliedUsers}