const express = require("express")
const Course = require("../models/course.model.js")

express().use(express.json())

const getCourses = async (req,res) => {
    const courses = await Course.find()
    res.json(courses)
}

const getCourseById = async (req,res) => {
    const course = await Course.findById(req.params.id)
    if (course) {
        res.status(200).json(course)
    }
    else{
        res.status(404).json("not found")
    }
}

const addCourse = async (req,res) => {
    const newCourse = new Course(req.body)
    await newCourse.save()

    // 201 means created successfully
    res.status(201).json(newCourse)
}

const editCourseById = async (req,res) => {
    const id = req.params.id
    let course = await Course.updateOne({_id : id},{$set : req.body})
    
    res.status(200).json(course)



}

const deleteCourseById = async (req,res) => {
    const id = req.params.id
    let courses = await Course.find()
    const originalLength = courses.length
    courses = await Course.deleteOne({_id : id})
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
}