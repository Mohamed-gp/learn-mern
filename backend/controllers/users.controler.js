const express = require("express")
const bcrypt = require("bcryptjs")
express().use(express.json())


const { SUCCESS, ERROR ,FAIL } = require("../utils/httpStatusCode.js")

const User = require("../models/user.model.js")

const getUsers = async (req,res) => {
    const query = req.query
    const limit = query.limit || 10
    const page = query.page || 1
    const skip = limit * (page - 1)
    const users = await User.find({},{__v : false}).limit(limit).skip(skip)
    res.json({status : "success",data: users})
}

const register = async (req,res) => { 
    const {firstName,lastName,email,password} = req.body
    const oldUser = await User.findOne({email: email})
    if(oldUser){
        res.status(404).json({status : FAIL,data : "email already exists"})
    }else{ 
        const hachedPassword = await bcrypt.hash(password,10)
        const newUser = new User(
            {
                firstName,
                lastName,
                email,
                password : hachedPassword
             }
    )
    await newUser.save()
    
    res.status(201).json({status : SUCCESS,data : null})
}

}

const login = async (req,res) => {
    const {email , password} = req.body

    const oldUser = await User.findOne({email : email})
    console.log(oldUser)

    if (!oldUser) {
        return res.status(404).json({status : FAIL,data : "user not found"})
    }
    else{
        const matchedPassword = await bcrypt.compare(password,oldUser.password)
        if (matchedPassword) {
            res.status(200).json({status : SUCCESS,data : null})
        }
        else{
            res.status(400).json({status : FAIL,data : "wrong password"})
        }
    }
}
module.exports = {getUsers,register,login}