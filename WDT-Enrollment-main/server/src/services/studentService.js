const Student = require("../models/Student");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");

const listStudents = async () =>
  Student.find()
    .populate("user", "name email role createdAt")
    .sort({ createdAt: -1 });

const getStudentById = async (id) => {
  const student = await Student.findById(id).populate("user", "name email role");
  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  return student;
};

const createStudent = async ({ name, email, password, phone, department, status }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email is already in use");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({
    name,
    email,
    password,
    role: "student",
  });

  const student = await Student.create({
    user: user._id,
    phone,
    department,
    status,
  });

  return Student.findById(student._id).populate("user", "name email role");
};

const updateStudent = async (id, payload) => {
  const student = await Student.findById(id).populate("user");
  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  const { name, email, phone, department, status } = payload;

  if (email && email !== student.user.email) {
    const emailInUse = await User.findOne({ email });
    if (emailInUse) {
      const error = new Error("Email is already in use");
      error.statusCode = 409;
      throw error;
    }
  }

  if (name) student.user.name = name;
  if (email) student.user.email = email;
  await student.user.save();

  student.phone = phone ?? student.phone;
  student.department = department ?? student.department;
  student.status = status ?? student.status;
  await student.save();

  return Student.findById(student._id).populate("user", "name email role");
};

const deleteStudent = async (id) => {
  const student = await Student.findById(id);
  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  await User.findByIdAndDelete(student.user);
  await Enrollment.deleteMany({ student: student._id });
  await student.deleteOne();
};

module.exports = {
  listStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
