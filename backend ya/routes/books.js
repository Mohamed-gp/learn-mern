const exprees = require("express")

const router = exprees.Router()
const {Book ,validateschema} = require("../models/Book")
const asyncHandler = require("express-async-handler")








/**
 * @desc get all books 
 * @route /api/books
 * @method  GET
 * @access public
 */
router.get("/",asyncHandler(
    async (req,res) => {
        const allBooks = await Book.find({}).populate("author",["firstName","lastName"])
        return res.status(200).json(allBooks)
    }
))
/**
 * @desc get book by id
 * @route /api/books/:id
 * @method  GET
 * @access public
 */
router.get("/:id",asyncHandler(
    async (req,res) => {
        const book = await Book.findById(req.params.id).populate("author")
        if (book) {
            res.status(200).json(book)
        }
        else{
            res.status(123).json({messsage : "book not found"})
        }
    
    }
))




/**
 * @desc add book 
 * @route /api/books
 * @method  POST
 * @access public
 */
router.post("/",asyncHandler(
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
))



/**
 * @desc delete book by id
 * @route /api/books/:id
 * @method  DELETE 
 * @access public
 */
router.delete("/api/books/:id",asyncHandler(
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
))


/**
 * @desc edit book by id
 * @route /api/books/:id
 * @method  PUT 
 * @access public
 */
router.put("/:id",asyncHandler(
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
))

module.exports = router