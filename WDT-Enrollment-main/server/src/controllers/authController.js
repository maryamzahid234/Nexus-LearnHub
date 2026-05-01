const asyncHandler = require("../utils/asyncHandler");
const { registerUser, loginUser } = require("../services/authService");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, department } = req.body;

  const trimmedEmail = email?.trim().toLowerCase();
  const trimmedPassword = password?.trim();

  if (!name || !trimmedEmail || !trimmedPassword) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  const payload = await registerUser({
    name,
    email: trimmedEmail,
    password: trimmedPassword,
    role: "student",
    phone,
    department,
  });
  res.status(201).json({ success: true, ...payload });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const trimmedEmail = email?.trim().toLowerCase();
  const trimmedPassword = password?.trim();

  console.log(`Login attempt for: ${trimmedEmail}`);

  if (!trimmedEmail || !trimmedPassword) {
    console.log("Login failed: Missing email or password");
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const payload = await loginUser({ email: trimmedEmail, password: trimmedPassword });
    console.log(`Login successful for: ${trimmedEmail} (Role: ${payload.user.role})`);
    res.json({ success: true, ...payload });
  } catch (error) {
    console.log(`Login failed for: ${trimmedEmail}. Error: ${error.message}`);
    res.status(error.statusCode || 401).json({
      success: false,
      message: error.message || "Invalid email or password",
    });
  }
});

module.exports = {
  register,
  login,
};
