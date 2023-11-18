let {courses} = require("../data/courses.js")

const getCourses = (req,res) => {
    res.json(courses)
}

const getCourseById = (req,res) => {
    const course = courses.find((course) => course.id == req.params.id)
    if (course) {
        res.status(200).json(course)
    }
    else{
        res.status(404).json("not found")
    }
}

const addCourse = (req,res) => {
    const course = {...req.body , id : courses.length + 1} 

    courses = [...courses, course]
    // 201 means created successfully
    res.status(201).json(courses)
}

const editCourseById = (req,res) => {
    const id = req.params.id
    
    let course = courses.find((course) => course.id == id)
    if(!course){
        res.status(404).json("not found")
    }
    else{
        course = {...course ,...req.body}
        res.status(200).json(course)
    }


}

const deleteCourseById = (req,res) => {
    const id = req.params.id
    const originalLength = courses.length
    courses = courses.filter((course) => course.id != id)
    const editedLenght = courses.length
    if (editedLenght == originalLength) {
        res.json("not found")
    }
    else{
        res.json("deleted")
    }




}

module.exports = {
    addCourse,
    editCourseById,
    deleteCourseById,
    getCourses,
    getCourseById,
  };