const express = require("express")
const router = express.Router()
const {User , validateloginschema , validateregisterschema} = require("../models/User")


router.get("/",async (req,res) => {
    const allUsers = await User.find({})
    return res.status(200).json(allUsers)
})


router.post("/register",async (req,res) => {
    const { error } = validateschema(req.body)
    if (error) {
        return res.status(500).json(error.message)
    }else{

        



    }
})



module.exports = {router}