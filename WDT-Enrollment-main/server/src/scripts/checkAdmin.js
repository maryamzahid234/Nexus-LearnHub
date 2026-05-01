require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const connectDatabase = require("../config/db");

const checkAdmin = async () => {
  try {
    await connectDatabase();
    
    const email = process.env.ADMIN_EMAIL || "admin@learnhub.com";
    const password = process.env.ADMIN_PASSWORD || "Admin123!";
    
    console.log(`Checking admin user: ${email}`);
    
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("CRITICAL: Admin user NOT found in database.");
      process.exit(1);
    }
    
    console.log("Admin user found. Role:", user.role);
    
    const isMatch = await user.comparePassword(password);
    console.log("Password match check:", isMatch ? "SUCCESS" : "FAILED");
    
    if (!isMatch) {
      console.log("Password in DB does not match the one in .env. Re-seeding might be needed.");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Diagnostic error:", error.message);
    process.exit(1);
  }
};

checkAdmin();
