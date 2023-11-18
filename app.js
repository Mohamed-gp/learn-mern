

const express = require("express")
const app = express()
const joi = require("joi")

app.use(express.json())


const PORT = 3000


const {router} = require("./routes/courses.route") 

// /api/courses => Router

app.use("/api/courses",router)










app.listen(PORT, (req,res) => {
    console.log("am listening on port 3000")
} )