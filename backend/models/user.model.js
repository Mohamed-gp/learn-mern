const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName :{
        type: String,
        required : true,

    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type : String,
        required : true,
        unique : [true,"email already exists"],
        validate : [validator.isEmail,"please enter a valid email"]
    },
    password : {
        type: String,
        required: true,
        min: [8,"password must be at least 8 characters"],

    }
})

module.exports = mongoose.model("user",userSchema)