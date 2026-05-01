const asyncHandler = require("../utils/asyncHandler");
const enrollmentService = require("../services/enrollmentService");

const getEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await enrollmentService.listEnrollments();
  res.json({ success: true, data: enrollments });
});

const getMyEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await enrollmentService.listMyEnrollments(req.user._id);
  res.json({ success: true, data: enrollments });
});

const createEnrollment = asyncHandler(async (req, res) => {
  const { studentId, courseId } = req.body;
  if (!courseId || (req.user.role === "admin" && !studentId)) {
    return res.status(400).json({
      success: false,
      message: "Course ID and student ID for admin actions are required",
    });
  }

  const enrollment = await enrollmentService.createEnrollment({
    requesterRole: req.user.role,
    requesterUserId: req.user._id,
    studentId,
    courseId,
  });

  res.status(201).json({ success: true, data: enrollment });
});

const deleteEnrollment = asyncHandler(async (req, res) => {
  await enrollmentService.deleteEnrollment(req.params.id, req.user.role, req.user._id);
  res.json({ success: true, message: "Enrollment deleted successfully" });
});

module.exports = {
  getEnrollments,
  getMyEnrollments,
  createEnrollment,
  deleteEnrollment,
};
