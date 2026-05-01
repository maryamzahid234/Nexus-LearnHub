import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Loader2 } from "lucide-react";
import FeedbackBanner from "../components/FeedbackBanner";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";
import { courseService } from "../services/courseService";
import { enrollmentService } from "../services/enrollmentService";

const CourseCatalogPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [feedback, setFeedback] = useState({ type: "info", message: "" });
  const [loadingId, setLoadingId] = useState("");

  useEffect(() => {
    courseService
      .getCourses()
      .then(setCourses)
      .catch((error) => {
        setFeedback({ type: "error", message: error.response?.data?.message || "Failed to load courses" });
      });
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      setLoadingId(courseId);
      await enrollmentService.createEnrollment({ courseId });
      setFeedback({ type: "success", message: "Enrollment completed successfully" });
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.message || "Unable to enroll in this course" });
    } finally {
      setLoadingId("");
    }
  };

  return (
    <div className="page-stack">
      <PageHeader
        title="Course catalog"
        description="Discover the current learning catalog and enroll in the experiences that match your goals."
      />
      <FeedbackBanner type={feedback.type} message={feedback.message} />

      <div className="card-grid">
        {courses.map((course, index) => (
          <motion.article
            key={course._id}
            className="course-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
          >
            <div className="course-meta">
              <span>{course.category}</span>
              <span className="badge active">{course.status}</span>
            </div>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="course-foot">
              <div>
                <strong>{course.instructor}</strong>
                <span>{course.duration}</span>
              </div>
              {user.role === "student" ? (
                <button
                  type="button"
                  className="primary-button"
                  disabled={loadingId === course._id}
                  onClick={() => handleEnroll(course._id)}
                >
                  {loadingId === course._id ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <span>Enroll</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalogPage;
