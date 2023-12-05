const { User ,validateloginschema,validateregisterschema} = require("../models/User")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")


/**
 * @desc login user
 * @method POST
 * @route /api/auth/login
 * @access public
 */
const login = asyncHandler(
    async (req,res) => {
        const { error } = validateloginschema(req.body)
        if (error) {
            return res.status(400).json({message : error.details[0].message})
        }
        const user = await User.findOne({email: req.body.email})
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password,user.password)

            if (validPassword) {
                const token = user.generateToken()
                const {password , ...others} = user._doc
                return res.status(200).json({...others,token})
            }else{
                return res.status(400).json({message : "wrong password"})
            }
        }
        return res.status(404).json({message : "user not found"})
    
    }
)




/**
 * @desc register user
 * @route /api/auth/register
 * @method  POST
 * @access public
 */
const register = asyncHandler(
    async (req,res) => {
        const { error } = validateregisterschema(req.body)

        if (error) {
            return res.status(400).json({message : error.details[0].message})
        }
        const user = await User.findOne({email: req.body.email})
        if (user) {
           return res.status(400).json({message : "user already exist "}) 
        }

        // this give you more control that what gpt said
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // req.body.password == hashedPassword

        req.body.password = await bcrypt.hash(req.body.password,10)
        const newUser = new User({
            username: req.body.username,
            email : req.body.email,
            password : req.body.password,
        })
        await newUser.save()
        const token = newUser.generateToken()
        const {password , ...other} = newUser._doc
        return res.status(200).json({...other,token})


    }
)


module.exports = {
    login,register
}