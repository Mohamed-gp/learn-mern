const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    price:{
        type: Number,
        required : true,

    }
})

// by default mongodb will return the collection name in plural form and in lower case 
module.exports = mongoose.model("course",courseSchema)