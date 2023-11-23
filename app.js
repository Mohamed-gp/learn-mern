

const express = require("express")
const app = express()
const mongoose = require("mongoose")

const url = 'mongodb+srv://mohamedterba6:LrAc7rJqKs2M0RVR@cluster0.w2sdpyk.mongodb.net/learning?retryWrites=true&w=majority';

mongoose.connect(url).then(() => {
    console.log("mongoos conected")
})
const joi = require("joi")

app.use(express.json())


const PORT = 3000


const {router} = require("./routes/courses.route") 

// /api/courses => Router

app.use("/api/courses",router)










app.listen(PORT, (req,res) => {
    console.log("am listening on port 3000")
} )