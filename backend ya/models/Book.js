const mongoose = require("mongoose")
const joi = require("joi")

const BookSchema = new mongoose.Schema({
    title : {
        type : String,
        minlength : 1,
        required : true,
        trim: true,
        maxlength : 100,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Author"
    },
    description: {
        type : String,
        minlength : 1,
        trim: true,
        required : true,
        maxlength : 100,
    },
    price: {
        type : Number,
        min : 0,
        required : true,
    },
    cover : {
        type : String,
        enum : ["soft cover","hard cover"],
        required: true
    }
},{timestamps : true})


const Book = mongoose.model("book",BookSchema)


const validateschema = (obj) => {
    const schema = joi.object({
        title : joi.string().trim().min(1).max(100).required(),
        author : joi.string().trim().min(3).max(100),
        description : joi.string().trim().min(1).max(100).required(),
        price : joi.number().min(1).max(10),
        cover : joi.string().valid("soft cover","hard cover").required()
    })

    
    return schema.validate(obj)
}

module.exports = {
    Book,
    validateschema
}

