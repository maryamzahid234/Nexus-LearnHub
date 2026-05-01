const asyncHandler = require("../utils/asyncHandler");
const courseService = require("../services/courseService");

const getCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.listCourses();
  res.json({ success: true, data: courses });
});

const getCourse = asyncHandler(async (req, res) => {
  const course = await courseService.getCourseById(req.params.id);
  res.json({ success: true, data: course });
});

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, instructor, duration } = req.body;
  if (!title || !description || !instructor || !duration) {
    return res.status(400).json({
      success: false,
      message: "Title, description, instructor, and duration are required",
    });
  }

  const course = await courseService.createCourse(req.body);
  res.status(201).json({ success: true, data: course });
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await courseService.updateCourse(req.params.id, req.body);
  res.json({ success: true, data: course });
});

const deleteCourse = asyncHandler(async (req, res) => {
  await courseService.deleteCourse(req.params.id);
  res.json({ success: true, message: "Course deleted successfully" });
});

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
