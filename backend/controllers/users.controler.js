const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateJwt")
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
    const {firstName,lastName,email,password,role} = req.body
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
                password : hachedPassword,
                role,
                avatar: req.file.filename
                
             }
    )
    // generate token
    const token = await generateToken({id: newUser._id,email : newUser.email,token : newUser.token,role : newUser.role})
    newUser.token = token

    await newUser.save()
    res.status(201).json({status : SUCCESS,data : newUser.token})
}

}

const login = async (req,res) => {
    const {email , password} = req.body

    const oldUser = await User.findOne({email : email})

    if (!oldUser) {
        return res.status(404).json({status : FAIL,data : "user not found"})
    }
    else{
        const matchedPassword = await bcrypt.compare(password,oldUser.password)
        if (matchedPassword) {
            const token = await generateToken({email : oldUser.email,id: oldUser._id,token : oldUser.token,role : oldUser.role})
            res.status(200).json({status : SUCCESS,data : {token}})
        }
        else{
            res.status(400).json({status : FAIL,data : "wrong password"})
        }
    }
}
module.exports = {getUsers,register,login}