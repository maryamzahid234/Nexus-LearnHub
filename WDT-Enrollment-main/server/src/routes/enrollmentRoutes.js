const express = require("express");
const {
  getEnrollments,
  getMyEnrollments,
  createEnrollment,
  deleteEnrollment,
} = require("../controllers/enrollmentController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/me", authorize("student"), getMyEnrollments);
router.get("/", authorize("admin"), getEnrollments);
router.post("/", authorize("admin", "student"), createEnrollment);
router.delete("/:id", authorize("admin", "student"), deleteEnrollment);

module.exports = router;
