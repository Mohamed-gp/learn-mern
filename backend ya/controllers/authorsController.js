const asyncHandler = require("express-async-handler")
const {Author,validateauthor}= require("../models/Author")



/**
 * @desc get all authors
 * @route /api/authors
 * @method  GET
 * @access public
 */
const getAllAuthors = asyncHandler(
    async (req,res) => {

        console.log(req.query)
        const { pageNumber } = req.query

        const limitPerPage = 2
        const allAuthors = await Author.find().limit(limitPerPage).skip((pageNumber - 1) * limitPerPage)
        res.status(200).json(allAuthors)
        // select to chose what appear and dont appear to the client
    
        // const allAuthors = await Author.find().sort({firstName : 1}).select("lastName -_id")
        
        
    
    }
)





/**
 * @desc get authors by id
 * @route /api/authors/:id
 * @method  GET
 * @access public
 */
const getAuthorByID = asyncHandler(
    async (req,res) => {

            const author = await Author.findById(req.params.id)
            if (author) {
                res.status(200).json({author})
            }else{
                res.status(404).json({message : "book not found "})
            }    

    
        
    }
)



/**
 * @desc delete author by id
 * @route /api/authors/:id
 * @method  DELETE
 * @access public
 */
const deleteAuthor = asyncHandler(
    async (req,res) => {
            const author = await Author.findById(req.params.id)
    
            if (author) {
                await Author.findByIdAndDelete(req.params.id)
                return res.status(200).json({message : "deleted succesfuly"})
            }else{
                return res.status(404).json({message : "author not found"})
                
            }    

        
    
    
    }
)




/**
 * @desc add author
 * @route /api/authors
 * @method  POST
 * @access public
 */

const addAuthor = asyncHandler(
    async (req,res) => {
        // to save in database
        
        const { error } = validateauthor(req.body)
        if (error) {
            return res.status(400).json({message : error.details[0].message})
        }
    
            const {firstName,lastName,age,nationality,image} = req.body
            const author = new Author({
                firstName,
                lastName,
                age,
                nationality,
                image
            })
        await author.save()
        
        res.status(201).json(author)

        
    }
)




/**
 * @desc edit author
 * @route /api/authors/:id
 * @method  PUT
 * @access public
 */

const editAuthor = asyncHandler(
    async (req,res) => {
        const { err } = validateauthor(req.body)
    
        if (err) {
            return res.status(400).json({message : err.details[0].message})        
        }                                           
    
    const author = await Author.findByIdAndUpdate(req.params.id,{
        $set : {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        age : req.body.age,
        nationality : req.body.nationality,
        image : req.body.image
        }
    },{new : true} )
    return res.status(200).json(author)
    

        
    }
)


module.exports = {
    getAllAuthors,getAuthorByID,deleteAuthor,editAuthor,addAuthor
}