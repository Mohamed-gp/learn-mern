const express = require("express");
const { validateCourse } = require("../handler/schemaHandler.js")
const joi = require("joi")

express().use(express.json())

const {getCourses,getCourseById,addCourse,editCourseById,deleteCourseById} = require("../controllers/courses.controler.js");
const verifyToken = require("../middleware/verifyToken.js");
const { ADMIN, MODERATOR } = require("../utils/user.roles.js");
const alowedTo = require("../middleware/alowedTo.js")

const router = express.Router();


router.route("/")
    .get(getCourses)
    .post(validateCourse,addCourse)

router.route("/:id")
    .get(getCourseById)
    .patch(editCourseById)
    .delete(verifyToken,alowedTo(ADMIN,MODERATOR),deleteCourseById)





module.exports = {coursesRouter: router}