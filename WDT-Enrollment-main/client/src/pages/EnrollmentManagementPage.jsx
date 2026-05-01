import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import EntityTable from "../components/EntityTable";
import EnrollmentForm from "../components/forms/EnrollmentForm";
import FeedbackBanner from "../components/FeedbackBanner";
import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import { enrollmentService } from "../services/enrollmentService";
import { studentService } from "../services/studentService";
import { courseService } from "../services/courseService";

const EnrollmentManagementPage = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [feedback, setFeedback] = useState({ type: "info", message: "" });
  const [loading, setLoading] = useState(false);

  const loadPage = async () => {
    const [studentData, courseData, enrollmentData] = await Promise.all([
      studentService.getStudents(),
      courseService.getCourses(),
      enrollmentService.getEnrollments(),
    ]);

    setStudents(studentData);
    setCourses(courseData);
    setEnrollments(enrollmentData);
  };

  useEffect(() => {
    loadPage().catch((error) => {
      setFeedback({ type: "error", message: error.response?.data?.message || "Failed to load enrollment data" });
    });
  }, []);

  const handleSubmit = async (payload) => {
    try {
      setLoading(true);
      await enrollmentService.createEnrollment(payload);
      setFeedback({ type: "success", message: "Enrollment created successfully" });
      await loadPage();
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.message || "Unable to create enrollment" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this enrollment?")) return;
    try {
      await enrollmentService.deleteEnrollment(id);
      setFeedback({ type: "success", message: "Enrollment deleted successfully" });
      await loadPage();
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.message || "Unable to remove enrollment" });
    }
  };

  return (
    <div className="page-stack">
      <PageHeader
        title="Enrollment management"
        description="Coordinate course participation with one-to-one enrollment actions and duplicate protection."
      />
      <FeedbackBanner type={feedback.type} message={feedback.message} />

      <Panel title="Create enrollment" description="Assign a student to a course using the linked relationship model.">
        <EnrollmentForm students={students} courses={courses} onSubmit={handleSubmit} loading={loading} />
      </Panel>

      <Panel title="Enrollment activity" description="Review the current learning roster across all students.">
        <EntityTable
          emptyText="No enrollments yet."
          columns={[
            { 
              key: "student", 
              label: "Student", 
              render: (row) => <div style={{ fontWeight: 600 }}>{row.student?.user?.name}</div> 
            },
            { key: "email", label: "Email", render: (row) => row.student?.user?.email },
            { key: "course", label: "Course", render: (row) => row.course?.title },
            { key: "instructor", label: "Instructor", render: (row) => row.course?.instructor },
            {
              key: "actions",
              label: "Actions",
              width: "80px",
              render: (row) => (
                <div className="table-actions">
                  <button 
                    type="button" 
                    className="icon-button danger" 
                    onClick={() => handleDelete(row._id)}
                    title="Remove enrollment"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ),
            },
          ]}
          rows={enrollments.map((enrollment) => ({ ...enrollment, id: enrollment._id }))}
        />
      </Panel>
    </div>
  );
};

export default EnrollmentManagementPage;
