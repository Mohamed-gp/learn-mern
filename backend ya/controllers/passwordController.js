const asyncHandler = require("express-async-handler")
const { User } = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")
const { validateChangePassword } = require("../models/User")


/**
 * @method GET
 * @desc get password view
 * @route /password/forgot-password
 * @access private
 */
module.exports.forgetPassword = asyncHandler(
    (req,res) => {
        res.render("forgot-password")
    }
)


/**
 * @method POST
 * @desc send forgot password link
 * @route /password/forgot-password
 * @access public
 */
module.exports.sendForgotPasswordLink = asyncHandler(
    async (req,res) => {
        const user = await User.findOne({email : req.body.email})
        if (!user) {
            res.status(404).json({message : "user not found"})
        }
        const secret = process.env.JWT_SECTET_KEY + user.password

        const token = jwt.sign({email : user.email,id : user._id},secret,{expiresIn : "10m"})

        const link = `http://localhost:3000/password/reset-password/${user._id}/${token}`
        
        // res.status(200).json({message : "enter the link",resetPasswordLink : link})
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        })
        const mailOptions = {
            from : process.env.EMAIL,
            to : user.email,
            subject: "Reset Your Password",
            html: `<div>
                        <h4>Click on the link below to reset your password</h4>
                        <a href="${link}">enter the link</a>
                   </div>`
        }

        transporter.sendMail(mailOptions,function(error,success) {
            if (error) {
                console.log(error)
                res.status(500).json({message : "Error"})
            }else{
                console.log(`Email sent : `,success.response)
                res.render("link-sended")
            }
        })
    } 
)


/**
 * @method GET
 * @desc send forgot password link
 * @route /password/reset-password/:user._id/:token
 * @access public
 */
module.exports.resetPasswordView = asyncHandler(
    async (req,res) => {
        const user = await User.findById(req.params._id)
        if (!user) {
            res.status(404).json({message : "user not found"})
        }
        const secret = process.env.JWT_SECTET_KEY + user.password
        try {
            jwt.verify(req.params.token,secret)
            res.render("reset-password",{email : user.email})
        } catch (error) {
            console.log(error)
            res.json({message : "Error"})
        }
    }
)


/**
 * @method POST
 * @desc resete password
 * @route /password/reset-password/:user._id/:token
 * @access public
 */

module.exports.getResetPasswordView = asyncHandler(
    async (req,res) => {
        const { error} = validateChangePassword(req.body)
        if (error) {
            res.status(500).json({message : error.details[0].message})
        }
        const user = await User.findById(req.params._id)
        if (!user) {
            res.status(404).json({message : "User not found"})
        }
        const secret = process.env.JWT_SECTET_KEY + user.password
        try {
            jwt.verify(req.params.token,secret)
            user.password = await bcrypt.hash(req.body.password,10)
            await user.save()
            res.render("success-password")
        } catch (error) {
            console.log(error)
            res.json({message : "Error"})
        }
    } 
)