const mongoose = require("mongoose")
const joi = require("joi")



const AuthorSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
        minlength : 4,
        maxlenght : 100
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        minlength : 4,
        maxlenght : 100
    },
    nationality : {
        type : String,
        required : true,
        trim : true,
        minlength : 4,
        maxlenght : 100
    },
    age : {
        type : Number,
        min : 1,
        max : 100
    },
    image : {
        type : String,
        default : "default-avatar.png"
    }
},{timestamps : true})

const Author = mongoose.model("Author",AuthorSchema)




// joi validation

const validateauthor = (obj) => {
    const schema = joi.object({
        firstName : joi.string().trim().min(4).max(100).required(),
        lastName : joi.string().trim().min(4).max(100).required(),
        nationality : joi.string().trim().min(4).max(100).required(),
        age : joi.number().min(2),
        image : joi.string().default("default-avatar.png")
    })
    return schema.validate(obj)
}

module.exports = {
    Author,
    validateauthor

}