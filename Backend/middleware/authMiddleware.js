import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' })
    }
}

export const isEmp = (req, res, next) => {
    if (req.user.role !== 'employee') {
        return res.status(403).json({ message: 'Access denied' })
    }
    next()
}

export const isHr = (req, res, next) => {
    if (req.user.role !== 'hr') {
        return res.status(403).json({ message: 'Access denied' })
    }
    next()
}