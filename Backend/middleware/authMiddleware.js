import jwt from "jsonwebtoken"

const auth = async(req, res, next) => {
    const token = req.cookies.token;

    try {
        if(!token){
            return res.status(404).json({
                success: false,
                message: "token not found"
            })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next()
    } catch (error) {
        console.log(error)
    }
}

const isHr = async(req, res, next) => {
    try {
        if(req.user.accountType != "hr"){
            return res.status(400).json({
                success: false, 
                message: "This route is only for HR"
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

const isEmp = async(req, res, next) => {
    try {
        if(req.user.accountType != "employee"){
            return res.status(400).json({
                success: false, 
                message: "This route is only for Employee"
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

export {auth, isHr, isEmp}