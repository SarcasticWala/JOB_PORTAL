import express from 'express'
import { createPost, editPost, deletePost, applyPost, getPostDetails, getAllPost } from '../controller/postController.js'
import { auth, isEmp, isHr } from '../middleware/authMiddleware.js'

const router = express.Router()


router.post("/createPost", auth, isHr, createPost)
router.put("/editPost", auth, isHr, editPost)
router.delete("/deletePost", auth, isHr, deletePost)
router.post("/applyPost", auth, isEmp, applyPost)
router.post("/getPostDetails", getPostDetails)
router.get("/getAllPost", getAllPost)


export default router