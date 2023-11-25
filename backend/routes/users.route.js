const express = require("express")
const multer = require("multer")
const {FAIL} = require("../utils/httpStatusCode")
// configure multer destination and edit file name to user dont change images of other users 
const diskStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"uploads")
    },
    filename : function (req,file,cb){
        const ex = file.mimetype.split("/")[1]
        const fileName = `user-${Date.now()}.${ex}`
    }

})
const fileUpload = (req,file,cb) => {
    

        fileType = file.mimetype.split("/")[0]
        if (fileType == "image") {
            return cb(null,true)
        }else{
            return cb(null,false)
        }
    
    
}
    

const upload = multer({
    storage: diskStorage,
    fileFilter : fileUpload
})

const {getUsers,register,login} = require("../controllers/users.controler.js") 
const verifyToken = require("../middleware/verifyToken.js")
const { date } = require("joi")

express().use(express.json())
const router = express.Router()

router.route("/")
    .get(verifyToken,getUsers)

router.route("/register")
    .post(upload.single("avatar"),register)   
router.route("/login")
    .post(login)


module.exports = {usersRouter : router }