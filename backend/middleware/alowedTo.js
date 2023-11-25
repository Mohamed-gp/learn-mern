const alowedTo = (...roles) => {

    
    return (req,res,next) => {
         const findedrole = roles.find(role => role == req.role)
         if (findedrole) {
            next()
         }
         else{
             res.status(403).json({status : "fail",data : "you are not alowed to do this action"})
         }
    }
}

module.exports = alowedTo;