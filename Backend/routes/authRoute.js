import express from 'express'
import {sendOtp, signup, login, logout, changePassword} from '../controller/authController.js'
import {auth, isEmp, isHr} from "../middleware/authMiddleware.js"
import { verifyEmail, verifyOtp, resetPassword } from '../controller/resetPassword.js'

const router = express.Router()

router.post('/sendOtp',sendOtp)
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post('/changePassword',auth,changePassword)

router.post('/verifyEmail',verifyEmail)
router.post('/verifyOtp',verifyOtp)
router.post('/resetPassword',resetPassword)

export default router