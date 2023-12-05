const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const {User , validateloginschema , validateregisterschema} = require("../models/User")
const { login , register} = require("../controllers/authController")




// login
router.post("/login",login)


//register
router.post("/register",register)



module.exports = router