import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import CourseForm from "../components/forms/CourseForm";
import EntityTable from "../components/EntityTable";
import FeedbackBanner from "../components/FeedbackBanner";
import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import { courseService } from "../services/courseService";

const CourseManagementPage = () => {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [feedback, setFeedback] = useState({ type: "info", message: "" });
  const [loading, setLoading] = useState(false);

  const loadCourses = async () => {
    const data = await courseService.getCourses();
    setCourses(data);
  };

  useEffect(() => {
    loadCourses().catch((error) => {
      setFeedback({ type: "error", message: error.response?.data?.message || "Failed to load courses" });
    });
  }, []);

  const handleSubmit = async (payload) => {
    try {
      setLoading(true);
      if (editing) {
        await courseService.updateCourse(editing._id, payload);
        setFeedback({ type: "success", message: "Course updated successfully" });
      } else {
        await courseService.createCourse(payload);
        setFeedback({ type: "success", message: "Course created successfully" });
      }
      setEditing(null);
      await loadCourses();
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.message || "Unable to save course" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await courseService.deleteCourse(id);
      setFeedback({ type: "success", message: "Course deleted successfully" });
      await loadCourses();
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.message || "Unable to delete course" });
    }
  };

  return (
    <div className="page-stack">
      <PageHeader
        title="Course management"
        description="Maintain a clear course catalog with concise metadata and publishing status."
      />
      <FeedbackBanner type={feedback.type} message={feedback.message} />

      <div className="two-column-grid">
        <Panel title={editing ? "Edit course" : "Create course"} description="Define the course details shown to students and admins.">
          <CourseForm
            initialValues={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            loading={loading}
          />
        </Panel>

        <Panel title="Course library" description="Edit or remove courses from the active catalog.">
          <EntityTable
            emptyText="No courses yet."
            columns={[
              { 
                key: "title", 
                label: "Title",
                render: (row) => <div style={{ fontWeight: 600 }}>{row.title}</div>
              },
              { key: "instructor", label: "Instructor" },
              { key: "duration", label: "Duration" },
              { 
                key: "status", 
                label: "Status",
                render: (row) => (
                  <span className={`badge ${row.status === 'published' ? 'active' : 'pending'}`}>
                    {row.status}
                  </span>
                )
              },
              {
                key: "actions",
                label: "Actions",
                width: "100px",
                render: (row) => (
                  <div className="table-actions">
                    <button 
                      type="button" 
                      className="icon-button" 
                      onClick={() => setEditing(row)}
                      title="Edit course"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      type="button" 
                      className="icon-button danger" 
                      onClick={() => handleDelete(row._id)}
                      title="Delete course"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ),
              },
            ]}
            rows={courses.map((course) => ({ ...course, id: course._id }))}
          />
        </Panel>
      </div>
    </div>
  );
};

export default CourseManagementPage;
