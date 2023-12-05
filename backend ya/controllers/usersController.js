const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const {User ,validateUpdateUser} = require("../models/User")




/**
 * @method GET
 * @desc get all users 
 * @access private Only admin
 * @route /api/users
 */
const getAllUsers = asyncHandler(
    async (req,res) => {
        const allUsers = await User.find().select("-password")
        res.status(200).json(allUsers)
    }
)



/**
 * @method GET
 * @desc get user information by id 
 * @access private (only admin and user by himself)
 * @route /api/users/:id
 */
const getUserByID = asyncHandler(
    async (req,res) => {
        const user = await User.findById(req.params.id).select("-password")
        if (user) {
            res.status(200).json(user)            
        }
        else{
            res.status(404).json({message : "user not found"})
        }
    }
 
)


/**
 * @method DELETE
 * @desc remove user 
 * @access private only user by himself and admin
 * @route /api/users/:id
 */
const deleteUser = asyncHandler( 
    async (req,res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message : "deleted succsefully"})
    }
    else{
        res.status(404).json({message : "user not found"})
    }
    
} 
)







/**
 * @method PUT
 * @desc modify user information by id 
 * @access public
 * @route /api/users/:id
 */

const editUserByID = asyncHandler(
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
)



module.exports = {
    getAllUsers,getUserByID,deleteUser,editUserByID
}