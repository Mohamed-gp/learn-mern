const asyncHandler = require("express-async-handler")
const {Book,validateschema} = require("../models/Book")



/**
 * @desc get all books 
 * @route /api/books
 * @method  GET
 * @access public
 */
const getAllBooks = asyncHandler(
    async (req,res) => {
        // comparaison Query Operators
        // $eq
        // $nq
        // $lt
        // $lte
        // $gt
        // $gte
        // $in => array $in : [1,2]
        // $nin
        // const allBooks = await Book.find({price : {$ne: 10}}).populate("author",["firstName","lastName"])
        // const allBooks = await Book.find({price : {$in: [10,12]}}).populate("author",["firstName","lastName"])
        const {minPrice,maxPrice } = req.query
        // for the naming of Qeury you can collaborate with the front-end and get the naming convention
        let allBooks
        if (minPrice && maxPrice) {
            allBooks = await Book.find({price : {$gte: minPrice,$lte : maxPrice}}).populate("author",["firstName","lastName"])    
        }else{
            allBooks = await Book.find().populate("author",["firstName","lastName"])
        }
        return res.status(200).json(allBooks)
    }
)




/**
 * @desc get book by id
 * @route /api/books/:id
 * @method  GET
 * @access public
 */
const getBookByID = asyncHandler(
    async (req,res) => {
        const book = await Book.findById(req.params.id).populate("author")
        if (book) {
            res.status(200).json(book)
        }
        else{
            res.status(123).json({messsage : "book not found"})
        }
    
    }
)



/**
 * @desc add book 
 * @route /api/books
 * @method  POST
 * @access private only admin can add book
 */
const addBook = asyncHandler(
    async(req,res) => {

        const { error } = validateschema(req.body)
        if (error) {
            // 400 mean that the error from the client not the server
            return res.status(400).json({messsage : error.details[0].message})
        }else{
            const book = new Book({
                title : req.body.title,
                author : req.body.author,
                description : req.body.description,
                cover : req.body.cover,
                price : req.body.price,
            })
            await book.save()
            res.status(200).json(book)
        }
    
    
    
    
    }
)




/**
 * @desc delete book by id
 * @route /api/books/:id
 * @method  DELETE 
 * @access public
 */
const deleteBook = asyncHandler(
    async (req,res) => {
        const book = await Book.findById(req.params.id)
        if (book) {
            await Book.findByIdAndDelete(req.params.id)
            return res.status(200).json({messsage : "succed ",})
        }
        else{
            res.status(400).json({messsage : "book not found "})
    
        }
    }
)


/**
 * @desc edit book by id
 * @route /api/books/:id
 * @method  PUT 
 * @access public
 */
const editBook = asyncHandler(
    async (req,res) => {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id,{
            $set : {

                title : req.body.title,
                author : req.body.author,
                description : req.body.description,
                cover : req.body.cover,
                price : req.body.price,
            }
        },{new : true})

        res.status(200).json(updatedBook)

    }
)


module.exports = {
    getAllBooks,getBookByID,addBook,deleteBook,editBook
}