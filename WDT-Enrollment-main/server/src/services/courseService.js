const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const listCourses = async () => Course.find().sort({ createdAt: -1 });

const getCourseById = async (id) => {
  const course = await Course.findById(id);
  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  return course;
};

const createCourse = async (payload) => Course.create(payload);

const updateCourse = async (id, payload) => {
  const course = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  return course;
};

const deleteCourse = async (id) => {
  const course = await Course.findById(id);
  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  await Enrollment.deleteMany({ course: course._id });
  await course.deleteOne();
};

module.exports = {
  listCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
