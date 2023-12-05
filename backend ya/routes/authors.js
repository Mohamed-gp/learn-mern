const express = require("express")
const {Author,validateauthor} = require("../models/Author")
const { verifyTokenAndAuthorizationAdmin } = require("../middlewares/verifyToken")
const {getAllAuthors,getAuthorByID,deleteAuthor,editAuthor,addAuthor} = require("../controllers/authorsController")


const router = express.Router()






router.route("/").get(getAllAuthors)
                 .post(verifyTokenAndAuthorizationAdmin,addAuthor)


router.route("/:id").get(getAuthorByID)
                    .delete(verifyTokenAndAuthorizationAdmin,deleteAuthor)
                    .put(verifyTokenAndAuthorizationAdmin,editAuthor)











module.exports = router