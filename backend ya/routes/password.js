const exprees = require("express")
const { forgetPassword, sendForgotPasswordLink, resetPasswordView, getResetPasswordView } = require("../controllers/passwordController")
const router = exprees.Router()


router.route("/forget-password").get(forgetPassword)
                                .post(sendForgotPasswordLink)
router.route("/reset-password/:_id/:token").get(resetPasswordView)
                                           .post(getResetPasswordView)
module.exports = router