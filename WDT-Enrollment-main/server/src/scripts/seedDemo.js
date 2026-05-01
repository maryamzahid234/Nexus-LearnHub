require("dotenv").config();

const connectDatabase = require("../config/db");
const User = require("../models/User");
const Student = require("../models/Student");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const demoStudents = [
  {
    name: "Ayesha Khan",
    email: "ayesha@student.learnhub.com",
    password: "Student123!",
    phone: "+92 300 1112233",
    department: "Computer Science",
    status: "active",
  },
  {
    name: "Bilal Ahmed",
    email: "bilal@student.learnhub.com",
    password: "Student123!",
    phone: "+92 300 2223344",
    department: "Software Engineering",
    status: "active",
  },
  {
    name: "Sara Noor",
    email: "sara@student.learnhub.com",
    password: "Student123!",
    phone: "+92 300 3334455",
    department: "Information Technology",
    status: "inactive",
  },
];

const demoCourses = [
  {
    title: "Modern React Fundamentals",
    description: "Build polished interfaces with components, routing, forms, and API integration.",
    instructor: "Engr. Hira Javed",
    duration: "6 Weeks",
    category: "Frontend",
    status: "published",
  },
  {
    title: "Node and Express API Design",
    description: "Create production-style REST APIs with middleware, auth, and clear service layers.",
    instructor: "Usman Tariq",
    duration: "8 Weeks",
    category: "Backend",
    status: "published",
  },
  {
    title: "MongoDB Data Modeling",
    description: "Design collections, relationships, and query patterns for MERN applications.",
    instructor: "Dr. Sana Rauf",
    duration: "4 Weeks",
    category: "Database",
    status: "published",
  },
];

const upsertAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || "admin@learnhub.com";
  let admin = await User.findOne({ email });

  if (!admin) {
    admin = await User.create({
      name: process.env.ADMIN_NAME || "Platform Admin",
      email,
      password: process.env.ADMIN_PASSWORD || "Admin123!",
      role: "admin",
    });
    console.log(`Admin created: ${admin.email}`);
  } else {
    console.log(`Admin already exists: ${admin.email}`);
  }

  return admin;
};

const upsertStudent = async (studentData) => {
  let user = await User.findOne({ email: studentData.email });

  if (!user) {
    user = await User.create({
      name: studentData.name,
      email: studentData.email,
      password: studentData.password,
      role: "student",
    });
    console.log(`Student user created: ${user.email}`);
  } else {
    user.name = studentData.name;
    user.role = "student";
    await user.save();
    console.log(`Student user already exists: ${user.email}`);
  }

  let student = await Student.findOne({ user: user._id });
  if (!student) {
    student = await Student.create({
      user: user._id,
      phone: studentData.phone,
      department: studentData.department,
      status: studentData.status,
    });
    console.log(`Student profile created: ${studentData.name}`);
  } else {
    student.phone = studentData.phone;
    student.department = studentData.department;
    student.status = studentData.status;
    await student.save();
    console.log(`Student profile updated: ${studentData.name}`);
  }

  return student;
};

const upsertCourse = async (courseData) => {
  let course = await Course.findOne({ title: courseData.title });

  if (!course) {
    course = await Course.create(courseData);
    console.log(`Course created: ${course.title}`);
  } else {
    Object.assign(course, courseData);
    await course.save();
    console.log(`Course updated: ${course.title}`);
  }

  return course;
};

const ensureEnrollment = async (studentId, courseId) => {
  const existingEnrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });

  if (!existingEnrollment) {
    await Enrollment.create({
      student: studentId,
      course: courseId,
    });
    console.log(`Enrollment created for student ${studentId} in course ${courseId}`);
  }
};

const seedDemo = async () => {
  try {
    await connectDatabase();

    await upsertAdmin();

    const studentDocs = [];
    for (const student of demoStudents) {
      studentDocs.push(await upsertStudent(student));
    }

    const courseDocs = [];
    for (const course of demoCourses) {
      courseDocs.push(await upsertCourse(course));
    }

    await ensureEnrollment(studentDocs[0]._id, courseDocs[0]._id);
    await ensureEnrollment(studentDocs[0]._id, courseDocs[1]._id);
    await ensureEnrollment(studentDocs[1]._id, courseDocs[1]._id);
    await ensureEnrollment(studentDocs[2]._id, courseDocs[2]._id);

    console.log("");
    console.log("Demo data ready.");
    console.log(`Admin login: ${process.env.ADMIN_EMAIL || "admin@learnhub.com"} / ${process.env.ADMIN_PASSWORD || "Admin123!"}`);
    console.log("Student login: ayesha@student.learnhub.com / Student123!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed demo data:", error.message);
    process.exit(1);
  }
};

seedDemo();
