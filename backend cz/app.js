require("dotenv").config()

const express = require("express")
const app = express()
const path = require("node:path") // make you join between routes and files
const mongoose = require("mongoose")
const { ERROR } = require("./utils/httpStatusCode.js")
// to be able for the front end to connect fromw differnt domain without any problem but you can get it in postman without it
const cors = require("cors")
// to make easily connect to the api with frontend  
app.use(cors())

// to use static files like images we say that make /uploads as a static folder we use join becuase it works on all operating systems linux / and windows \ so any photo in uploads will work with this use(middleware)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

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