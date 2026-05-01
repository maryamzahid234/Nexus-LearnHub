const User = require("../models/User");
const Student = require("../models/Student");
const generateToken = require("../utils/generateToken");

const sanitizeAuthUser = (user, student = null) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  studentId: student?._id || null,
});

const registerUser = async ({ name, email, password, role, phone, department }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email is already in use");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, email, password, role });
  let student = null;

  if (role === "student") {
    student = await Student.create({
      user: user._id,
      phone,
      department,
    });
  }

  const token = generateToken({
    userId: user._id,
    role: user.role,
  });

  return {
    token,
    user: sanitizeAuthUser(user, student),
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const student = user.role === "student" ? await Student.findOne({ user: user._id }) : null;
  const token = generateToken({
    userId: user._id,
    role: user.role,
  });

  return {
    token,
    user: sanitizeAuthUser(user, student),
  };
};

module.exports = {
  registerUser,
  loginUser,
};
