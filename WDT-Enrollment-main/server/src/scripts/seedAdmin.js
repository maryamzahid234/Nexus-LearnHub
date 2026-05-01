require("dotenv").config();

const connectDatabase = require("../config/db");
const User = require("../models/User");

const seedAdmin = async () => {
  try {
    await connectDatabase();

    const email = process.env.ADMIN_EMAIL || "admin@learnhub.com";
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log(`Admin already exists for ${email}`);
      process.exit(0);
    }

    const admin = await User.create({
      name: process.env.ADMIN_NAME || "Platform Admin",
      email,
      password: process.env.ADMIN_PASSWORD || "Admin123!",
      role: "admin",
    });

    console.log(`Admin seeded: ${admin.email}`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
