const mongoose = require("mongoose")
const joi = require("joi")


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
        minlength : 5,
        maxlength : 100,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false

    },

},{timestamps : true})


const User = mongoose.model("user",UserSchema)

const validateloginschema = (obj) => {
    const schema = joi.object({
        email : joi.string().trim().min(5).max(100).required(),
        password : joi.string().trim().min(5).max(100).required(),
    })

    
    return schema.validate(obj)
}
const validateregisterschema = (obj) => {
    const schema = joi.object({
        username : joi.string().trim().min(5).max(100).required(),
        isAdmin : joi.boolean().default(false),
        email : joi.string().trim().min(5).max(100).required(),
        password : joi.string().trim().min(5).max(100).required(),
    })

    
    return schema.validate(obj)
}




module.exports = {
    User,
    validateloginschema,
    validateregisterschema
    
}





