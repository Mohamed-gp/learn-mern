require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const { ERROR } = require("./utils/httpStatusCode.js")
// to be able for the front end to connect fromw differnt domain without any problem but you can get it in postman without it
const cors = require("cors")

app.use(cors())

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log("mongoos conected")
})
const joi = require("joi")

app.use(express.json())


const PORT = process.env.PORT


const {coursesRouter} = require("./routes/courses.route"); 
const {usersRouter} = require("./routes/users.route");

// /api/courses => Router

app.use("/api/courses",coursesRouter)
app.use("/api/users",usersRouter)

app.all("*",(req,res)=> {
    return res.status(404).json({status : ERROR,data : null})
})









app.listen(PORT, (req,res) => {
    console.log("am listening on port 3000")
} )