const express = require("express")

const {getUsers,register,login} = require("../controllers/users.controler.js") 

express().use(express.json())
const router = express.Router()

router.route("/")
    .get(getUsers)

router.route("/register")
    .post(register)   
router.route("/login")
    .post(login)


module.exports = {usersRouter : router }