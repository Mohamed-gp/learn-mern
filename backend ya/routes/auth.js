const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const {User , validateloginschema , validateregisterschema} = require("../models/User")


/**
 * @desc login user
 * @method POST
 * @route /api/auth/login
 * @access public
 */
router.post("/login",asyncHandler(
    async (req,res) => {
        const { error } = validateloginschema(req.body)
        if (error) {
            return res.status(400).json({message : error.details[0].message})
        }
        const user = await User.findOne({email: req.body.email})
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password,user.password)

            if (validPassword) {
                const token = await jwt.sign({isAdmin : user.isAdmin,id: user._id},process.env.JWT_SECTET_KEY,{expiresIn : "3d"})
                const {password , ...others} = user._doc
                return res.status(200).json({...others,token})
            }else{
                return res.status(400).json({message : "wrong password"})
            }
        }
        return res.status(404).json({message : "user not found"})
    
    }
))


















/**
 * @desc register user
 * @route /api/auth/register
 * @method  POST
 * @access public
 */
router.post("/register",asyncHandler(
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
            isAdmin : req.body.isAdmin
        })
        await newUser.save()

        const token = await jwt.sign({isAdmin: newUser.isAdmin,id : newUser._id},process.env.JWT_SECTET_KEY,{expiresIn : "3d"})
        const {password , ...other} = newUser._doc
        return res.status(200).json({...other,token})


    }
))



module.exports = router