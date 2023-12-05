const exprees = require("express")
const { User , validateUpdateUser} = require("../models/User")
const { verifyTokenAndAuthorization, verifyTokenAndAuthorizationAdmin } = require("../middlewares/verifyToken")
const router = exprees.Router()
const { getAllUsers,getUserByID,deleteUser,editUserByID } = require("../controllers/usersController")


router.route("/").get(verifyTokenAndAuthorizationAdmin,getAllUsers)



router.route("/:id").get(verifyTokenAndAuthorization,getUserByID)
                    .delete(verifyTokenAndAuthorization,deleteUser)
                    .put(verifyTokenAndAuthorization,editUserByID)







module.exports = router