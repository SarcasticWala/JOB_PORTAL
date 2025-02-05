import express from 'express'
import { createPost, editPost, deletePost, applyPost, getPostDetails, getAllPost } from '../controller/postController.js'
import { auth, isEmp, isHr } from '../middleware/authMiddleware.js'
import { Post } from '../models/PostSchema.js';
import cloudinary from 'cloudinary';

const router = express.Router()

router.post('/upload', async (req, res) => {
  try {
    const file = req.files.image;
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath);
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      imageUrl: result.secure_url,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error uploading image:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/createPost", auth, isHr, createPost)
router.put("/editPost", auth, isHr, editPost)
router.delete("/deletePost", auth, isHr, deletePost)
router.post("/applyPost", auth, isEmp, applyPost)
router.post("/getPostDetails", getPostDetails)
router.get("/getAllPost", getAllPost)

export default router