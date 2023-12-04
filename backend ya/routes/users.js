const exprees = require("express")
const { User , validateUpdateUser} = require("../models/User")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { verifyTokenAndAuthorization, verifyTokenAndAuthorizationAdmin } = require("../middlewares/verifyToken")
const router = exprees.Router()

router.get("/", asyncHandler(
    async (req,res) => {
        const allUsers = await User.find({})
        res.status(200).json(allUsers)
    }
))


// update User information

/**
 * @method PUT
 * @desc modify user information by id 
 * @access public
 * @route /api/users/:id
 */
router.put("/:id",verifyTokenAndAuthorization,asyncHandler(
    async (req,res) => {
        
        const { error } = validateUpdateUser(req.body)
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password,10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set : {
                email: req.body.email,
                password: req.body.password,
                username : req.body.username

            }
        },{new : true}).select("-password")

        res.status(200).json(updatedUser)


    }
))

router.get("/",verifyTokenAndAuthorizationAdmin,asyncHandler(
    async (req,res) => {
        console.log("Hekki")
    const allUsers = await User.find()
    return res.status(200).json(allUsers)
}))


module.exports = router