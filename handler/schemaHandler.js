// create schema 
const joi= require("joi")
const express = require("express") 
const app = express()
app.use(express.json())


const courseSchema = joi.object(
    {
        name: joi.string().min(6).required(),
        price: joi.number().required().min(10).max(10000)
    }
)

const validateCourse = (req,res,next) => {
    const result = courseSchema.validate(req.body)
    if (result.error) {
        console.log(result.error.details[0].message)
        return res.status(400).json(result.error.details[0].message)
    }
    next()


}

module.exports = {validateCourse}
