const express = require("express");
const {validateCourse} = require("../handler/schemaHandler.js")

const {addCourse,editCourseById,deleteCourseById,getCourses,getCourseById} = require("../controllers/courses.controler.js")

const router = express.Router();


router.route("/")
    .get(getCourses)
    .post(validateCourse,addCourse)

router.route("/:id")
    .get(getCourseById)
    .patch(editCourseById)
    .delete(deleteCourseById)





module.exports = {router}