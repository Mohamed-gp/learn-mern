const express = require("express")
const logger = require("./middlewares/logger")
const {errorHandler,notFound} = require("./middlewares/errorHandler") 
const connectDB = require("./config/db.js")
require("dotenv").config()


connectDB()


const app = express()
app.use(logger)
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

// passwrod is not an api
app.use("/password",require("./routes/password.js"))

// error handler 
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT



app.listen(PORT,() => {
    console.log("server is running on",process.env.NODE_ENV,"on port",PORT)
})