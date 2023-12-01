const express = require("express")
const joi = require("joi")

const app = express()
app.use(express.json())

const PORT = 3000

let books = [
    {
        id: 1,
        title: "can't hurt me",
        author : "david googins",
        description : "this book is a mind blowing",
        price : 29
    },
    {
        id: 2,
        title: "atomic habits",
        description : "this book is a mind blowing",
        author : "david googins",
        
        price : 19,
    },
    {
        id: 3,
        title: "introduction to algorithm",
        author : "david googins",
        description : "this book is a mind blowing",
        price : 21
    },
    
]


app.get("/",(req,res) => {
    res.send("welcome to our exprees app")
})

app.get("/api/books",(req,res) => {
    res.json(books)    
})
app.get("/api/books/:id",(req,res) => {
    const book = books.find(book => book.id == req.params.id)
    if (book) {
        res.status(200).json(book)
    }
    else{
        res.status(123).json({messsage : "book not found"})
    }

})

app.post("/api/books",(req,res) => {
    const schema = joi.object({
        title : joi.string().trim().min(3).max(10),
        author : joi.string().trim().min(3).max(10),
        description : joi.string().trim().min(3).max(10),
        price : joi.number().min(1).max(10)
    })

    const book = {
        id : books.length + 1 ,
        title : req.body.title,
        author : req.body.author,
        description : req.body.description,
        price : req.body.price,
    }
    const {error} = schema.validate(req.body)
    if (error) {
        res.status(400).json({error})
    }else{
        res.status(200).json(book)
    }

    books = [...books,book]



})
app.delete("/api/books/:id",(req,res) => {
    const newbooks = books.filter(book => book.id != req.params.id )
    if (newbooks.length == books.length) {
        res.status(400).json({messsage : "book not found "})
    }
    else{
        res.status(200).json({messsage : "succed ",})

    }
})


app.listen(PORT,() => {
    console.log("am listening of port ",PORT)
})