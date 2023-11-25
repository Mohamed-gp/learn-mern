const jwt = require("jsonwebtoken")


module.exports = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" })
    return token 
}