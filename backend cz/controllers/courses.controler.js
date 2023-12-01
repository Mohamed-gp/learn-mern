const express = require("express")
const Course = require("../models/course.model.js")
const { SUCCESS,FAIL,ERROR} = require("../utils/httpStatusCode.js")

express().use(express.json())

const getCourses = async (req,res) => {
    // pagination
    const query = req.query
    const limit = query.limit || 10
    const page = query.page || 1
    const skip = (page - 1) * limit
    const courses = await Course.find({},{__v: false}).limit(limit).skip(skip)
    res.json({status : "success",data: courses})
}

const getCourseById = async (req,res) => {
    const course = await Course.findById(req.params.id)
    if (course) {
        res.status(200).json({status : SUCCESS,data: course})
    }
    else{
        res.status(404).json({
            status : FAIL,
            data : "not found"
        })
    }
}

const addCourse = async (req,res) => {
    const newCourse = new Course(req.body)
    await newCourse.save()

    // 201 means created successfully
    res.status(201).json({status: SUCCESS, data: newCourse})
}

const editCourseById = async (req,res) => {
    const id = req.params.id
    let course = await Course.updateOne({_id : id},{$set : req.body})
    
    res.status(200).json({status : SUCCESS,data: course})



}

const deleteCourseById = async (req,res) => {
    const id = req.params.id
    let courses = await Course.find()
    const originalLength = courses.length
    courses = await Course.deleteOne({_id : id})
    const editedLenght = courses.length
    if (editedLenght == originalLength) {
        res.status(400).json({status : FAIL,data :"not found"})
    }
    else{
        res.status(200).json({status : SUCCESS,data : "null"})
    }




}

module.exports = {
    addCourse,
    editCourseById,
    deleteCourseById,
    getCourses,
    getCourseById,
}