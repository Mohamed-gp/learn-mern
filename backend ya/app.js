const express = require("express")
const logger = require("./middlewares/logger")
const {errorHandler,notFound} = require("./middlewares/errorHandler") 
const connectDB = require("./config/db.js")
const path = require("path")
const helmet = require("helmet")
const cors = require("cors")
require("dotenv").config()


connectDB()


const app = express()
app.use(cors())

// it mean only port 3000 can benifit from this api 
// app.use(cors({
//     origin : "http://localhost:3000"
// }))
// static folder

app.use(express.static(path.join(__dirname,"images")))
app.use(express.urlencoded({ extended: true }));
app.use(logger)
// helmet
app.use(helmet())
// ejs
app.set("view engine","ejs")

app.use(express.json())
app.get("/",(req,res) => {
    res.send("welcome to our exprees app")
})



// books route
app.use("/api/books",require("./routes/books"))
// authors route

app.use("/api/authors", require("./routes/authors"))

// auth route 
app.use("/api/auth",require("./routes/auth.js"))


// users route
app.use("/api/users",require("./routes/users.js"))

// uploads router
app.use("/uploads",require("./routes/uploads.js"))

// passwrod is not an api
app.use("/password",require("./routes/password.js"))



// error handler 
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT



app.listen(PORT,() => {
    console.log("server is running on",process.env.NODE_ENV,"on port",PORT)
})