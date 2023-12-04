const jwt = require("jsonwebtoken")


const verifyToken = (req,res,next) => {
    const token = req.headers.token
    if (token) {
        try {
            const decoded =  jwt.verify(token,process.env.JWT_SECTET_KEY)
            req.user = decoded
            next()
            
        } catch (error) {
            res.status(401).json({message : "invalid token"})
        }
    }else{
        res.status(401).json({message : "token not provided"})
    }

    
}

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res,() => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next()            
        }
        else{
            return res.status(403).json({message : "you are not allowed"})
        }
    })
}

const verifyTokenAndAuthorizationAdmin = (req,res,next) => {
    verifyToken(req,res,() => {
        if (req.user.isAdmin) {
            next()
        }
        else{
            return res.status(403).json("you are not admin")
        }
    })
}

module.exports = { verifyTokenAndAuthorization,verifyTokenAndAuthorizationAdmin }