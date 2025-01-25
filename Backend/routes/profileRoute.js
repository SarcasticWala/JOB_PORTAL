import express from 'express'
import { updateProfile, updateImage, updateResume, deleteProfile, getUserDetails, getApplyPost, getMyPosts, getAppliedUsers } from '../controller/profileController.js'
import { auth, isEmp, isHr } from '../middleware/authMiddleware.js'

const router = express.Router()


router.post("/updateProfile", auth, updateProfile)
router.post("/updateImage", auth, updateImage)
router.post("/updateResume", auth, isEmp, updateResume)

router.delete("/deleteProfile", auth, deleteProfile)

router.get("/getUserDetails", auth, getUserDetails)
router.get("/getApplyPost", auth, isEmp, getApplyPost)
router.get("/getMyPosts", auth, isHr, getMyPosts)
router.post("/getAppliedUsers", auth, isHr, getAppliedUsers)

export default router