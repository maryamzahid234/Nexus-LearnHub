import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import EntityTable from "../components/EntityTable";
import FeedbackBanner from "../components/FeedbackBanner";
import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import { enrollmentService } from "../services/enrollmentService";

const MyEnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [feedback, setFeedback] = useState({ type: "info", message: "" });

  const loadEnrollments = async () => {
    const data = await enrollmentService.getMyEnrollments();
    setEnrollments(data);
  };

  useEffect(() => {
    loadEnrollments().catch((error) => {
      setFeedback({ type: "error", message: error.response?.data?.message || "Failed to load enrollments" });
    });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to unenroll from this course?")) return;
    try {
      await enrollmentService.deleteEnrollment(id);
      setFeedback({ type: "success", message: "Enrollment removed successfully" });
      await loadEnrollments();
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.message || "Unable to remove enrollment" });
    }
  };

  return (
    <div className="page-stack">
      <PageHeader
        title="My enrollments"
        description="Keep track of your current course commitments and leave a course when needed."
      />
      <FeedbackBanner type={feedback.type} message={feedback.message} />

      <Panel title="Active learning" description="Your enrollments are linked directly to your student profile.">
        <EntityTable
          emptyText="You are not enrolled in any courses yet."
          columns={[
            { 
              key: "title", 
              label: "Course", 
              render: (row) => <div style={{ fontWeight: 600 }}>{row.course?.title}</div> 
            },
            { key: "instructor", label: "Instructor", render: (row) => row.course?.instructor },
            { key: "duration", label: "Duration", render: (row) => row.course?.duration },
            { key: "category", label: "Category", render: (row) => row.course?.category },
            {
              key: "actions",
              label: "Actions",
              width: "100px",
              render: (row) => (
                <div className="table-actions">
                  <button 
                    type="button" 
                    className="icon-button danger" 
                    onClick={() => handleDelete(row._id)}
                    title="Unenroll"
                  >
                    <LogOut size={16} />
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

export default MyEnrollmentsPage;
