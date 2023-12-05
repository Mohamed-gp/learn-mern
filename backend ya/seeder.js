const conectDB = require("./config/db")
const {books , authors} = require("./data")
const { Author } = require("./models/Author")
const {Book} = require("./models/Book")
require("dotenv").config()


conectDB()


const addBooks = async (data) => {
    try {
        await Book.insertMany(data)
        console.log("books added")
        // process.exit(1) i try to add this to work then copy in terminal without doing ctrl + c to close the command and type another again
        
    } catch (error) {
        console.log(error)
        // if error it will disable the connection with data base
        process.exit(1)
    }
}

const removeAllbooks = async () => {
    try {
        await Book.deleteMany()
        console.log("books removed")
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const addAuthors = async () => {
    try {
        await Author.insertMany(authors)
        console.log("added succsefully of authors")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


const removeAllAuthors = async () => {
    try {
        await Author.deleteMany()
        console.log("removed authors succsefully")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


if (process.argv[2] == "-add") {
    addBooks(books)
    addAuthors()
    
}else if (process.argv[2] == "-remove") {
    removeAllbooks()
    removeAllAuthors()
}




