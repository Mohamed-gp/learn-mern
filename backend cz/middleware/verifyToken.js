const jwt = require("jsonwebtoken")
const { FAIL } = require("../utils/httpStatusCode")

const verifyToken = (req,res,next) => {
    const authorization = req.headers.authorization || req.headers.Authorization
    if (!authorization) {
        return res.status(401).json({status : FAIL,data : "token is required"})
    }
    const token = authorization.split(" ")[1]

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    req.role = decodedToken.role
    if (decodedToken) {
        next()
    }
    else{
        return res.status(401).json({status: FAIL,data : "token is not valid"})
    }

}

module.exports = verifyToken