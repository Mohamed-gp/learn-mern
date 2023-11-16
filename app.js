const express = require("express")
const app = express()
const PORT = 3000

const corses = [{
    name: "course1",
    id : "1",
    price: "500",
    discont: "10",
},{
    name: "course2",
    id : "2",
    price: "5300",
    discont: "10",
},{
    name: "course3",
    id : "3",
    price: "200",
    discont: "12",
},{
    name: "course4",
    id : "3",
    price: "500",
    discont: "14",
},]


app.get("/courses",(req,res) => {
    res.json(corses)
})

app.get("/courses/:id", (req,res) => {
    res.json(corses[req.params.id - 1])
})



app.listen(PORT , () => {
    console.log("am listening on port 3000")
})