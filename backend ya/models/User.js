const mongoose = require("mongoose")
const joi = require("joi")
const jwt = require("jsonwebtoken")
const passwordComplexity = require("joi-password-complexity")


const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        trim : true,
        minlength : 5,
        maxlength : 100,
        required : true,

    },
    email : {
        type: String,
        trim : true,
        minlength : 5,
        maxlength : 100,
        required : true,
        unique : true

    },
    password : {
        type : String,
        trim : true,
        minlength : 8,
        maxlength : 100,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false

    },

},{timestamps : true})

UserSchema.methods.generateToken =function () {
    return jwt.sign({isAdmin: this.isAdmin,id : this._id},process.env.JWT_SECTET_KEY,{expiresIn : "3d"})
}

const User = mongoose.model("user",UserSchema)




const validateloginschema = (obj) => {
    const schema = joi.object({
        email : joi.string().trim().min(5).max(100).required(),
        password : joi.string().trim().min(5).max(100).required(),
    })

    
    return schema.validate(obj)
}
const validateChangePassword = (obj) => {
    const schema = joi.object({
        password : joi.string().trim().min(5).max(100).required(),
    })

    
    return schema.validate(obj)
}



const validateregisterschema = (obj) => {
    const schema = joi.object({
        username : joi.string().trim().min(5).max(100).required(),
        email : joi.string().trim().min(5).max(100).required(),
        password : passwordComplexity().required(),
    })

    
    return schema.validate(obj)
}









const validateUpdateUser = (obj) => {
    const Schema = joi.object({
        username : joi.string().trim().min(5).max(100),
        isAdmin : joi.boolean().default(false),
        email : joi.string().trim().min(5).max(100),
        password : joi.string().trim().min(5).max(100),
    })

    return Schema.validate(obj)
}




















module.exports = {
    User,
    validateloginschema,
    validateregisterschema,
    validateUpdateUser,
    validateChangePassword
    
}





