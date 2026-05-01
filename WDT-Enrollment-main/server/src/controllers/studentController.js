const asyncHandler = require("../utils/asyncHandler");
const studentService = require("../services/studentService");

const getStudents = asyncHandler(async (req, res) => {
  const students = await studentService.listStudents();
  res.json({ success: true, data: students });
});

const getStudent = asyncHandler(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);
  res.json({ success: true, data: student });
});

const createStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  const student = await studentService.createStudent(req.body);
  res.status(201).json({ success: true, data: student });
});

const updateStudent = asyncHandler(async (req, res) => {
  const student = await studentService.updateStudent(req.params.id, req.body);
  res.json({ success: true, data: student });
});

const deleteStudent = asyncHandler(async (req, res) => {
  await studentService.deleteStudent(req.params.id);
  res.json({ success: true, message: "Student deleted successfully" });
});

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
