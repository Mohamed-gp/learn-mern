const express = require("express")
const booksrouter = require("./routes/books")
const authorsrouter = require("./routes/authors")
const usersrouter = require("./routes/users.js")
const authrouter = require("./routes/auth.js")
const dotenv = require("dotenv")
dotenv.config()

const mongoose = require("mongoose")
const logger = require("./middlewares/logger")
const {errorHandler,notFound} = require("./middlewares/errorHandler") 


mongoose.connect(process.env.MONGO_URI)
.then(() => {console.log("connected succsefully")})
.catch(err => console.log(err))


const app = express()
app.use(logger)
app.use(express.json())


app.get("/",(req,res) => {
    res.send("welcome to our exprees app")
})



// books route
app.use("/api/books",booksrouter)
// authors route

app.use("/api/authors", authorsrouter)

// auth route 
app.use("/api/auth",authrouter)


// users route
app.use("/api/users",usersrouter)

// error handler 
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT



app.listen(PORT,() => {
    console.log("server is running on",process.env.NODE_ENV,"on port",PORT)
})