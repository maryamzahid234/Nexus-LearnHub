const Enrollment = require("../models/Enrollment");
const Student = require("../models/Student");
const Course = require("../models/Course");

const listEnrollments = async () =>
  Enrollment.find()
    .populate({
      path: "student",
      populate: {
        path: "user",
        select: "name email",
      },
    })
    .populate("course", "title instructor duration category")
    .sort({ createdAt: -1 });

const listMyEnrollments = async (userId) => {
  const student = await Student.findOne({ user: userId });
  if (!student) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  return Enrollment.find({ student: student._id })
    .populate("course", "title description instructor duration category status")
    .sort({ createdAt: -1 });
};

const createEnrollment = async ({ requesterRole, requesterUserId, studentId, courseId }) => {
  let targetStudentId = studentId;

  if (requesterRole === "student") {
    const student = await Student.findOne({ user: requesterUserId });
    if (!student) {
      const error = new Error("Student profile not found");
      error.statusCode = 404;
      throw error;
    }
    targetStudentId = student._id.toString();
  }

  const student = await Student.findById(targetStudentId);
  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  const course = await Course.findById(courseId);
  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  const existingEnrollment = await Enrollment.findOne({
    student: targetStudentId,
    course: courseId,
  });
  if (existingEnrollment) {
    const error = new Error("Student is already enrolled in this course");
    error.statusCode = 409;
    throw error;
  }

  return Enrollment.create({
    student: targetStudentId,
    course: courseId,
  });
};

const deleteEnrollment = async (id, requesterRole, requesterUserId) => {
  const enrollment = await Enrollment.findById(id).populate("student");
  if (!enrollment) {
    const error = new Error("Enrollment not found");
    error.statusCode = 404;
    throw error;
  }

  if (requesterRole === "student") {
    const student = await Student.findOne({ user: requesterUserId });
    if (!student || student._id.toString() !== enrollment.student._id.toString()) {
      const error = new Error("You can only manage your own enrollments");
      error.statusCode = 403;
      throw error;
    }
  }

  await enrollment.deleteOne();
};

module.exports = {
  listEnrollments,
  listMyEnrollments,
  createEnrollment,
  deleteEnrollment,
};
