const exprees = require("express")

const router = exprees.Router()
const {Book ,validateschema} = require("../models/Book")
const { verifyTokenAndAuthorizationAdmin } = require("../middlewares/verifyToken")
const { getAllBooks,getBookByID,addBook,deleteBook,editBook} = require("../controllers/bookController")









router.route("/").get(getAllBooks)
                 .post(verifyTokenAndAuthorizationAdmin,addBook)   





router.route("/:id").get(getBookByID)
                    .delete(verifyTokenAndAuthorizationAdmin,deleteBook)
                    .put(verifyTokenAndAuthorizationAdmin,editBook)









module.exports = router