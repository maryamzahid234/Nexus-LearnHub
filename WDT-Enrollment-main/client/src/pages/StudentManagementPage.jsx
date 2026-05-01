import { useEffect, useState } from "react";
import { Pencil, Trash2, UserPlus, Users } from "lucide-react";
import EntityTable from "../components/EntityTable";
import FeedbackBanner from "../components/FeedbackBanner";
import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import StudentForm from "../components/forms/StudentForm";
import { studentService } from "../services/studentService";

const StudentManagementPage = () => {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [feedback, setFeedback] = useState({ type: "info", message: "" });
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    const data = await studentService.getStudents();
    setStudents(data);
  };

  useEffect(() => {
    loadStudents().catch((error) => {
      setFeedback({ type: "error", message: error.response?.data?.message || "Failed to load students" });
    });
  }, []);

  const handleSubmit = async (payload) => {
    try {
      setLoading(true);
      if (editing) {
        await studentService.updateStudent(editing._id, payload);
        setFeedback({ type: "success", message: "Student updated successfully" });
      } else {
        await studentService.createStudent(payload);
        setFeedback({ type: "success", message: "Student created successfully" });
      }
      setEditing(null);
      await loadStudents();
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.message || "Unable to save student" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await studentService.deleteStudent(id);
      setFeedback({ type: "success", message: "Student deleted successfully" });
      await loadStudents();
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.message || "Unable to delete student" });
    }
  };

  return (
    <div className="page-stack">
      <PageHeader
        title="Student management"
        description="Create student records, keep contact data current, and manage profile status."
      />
      <FeedbackBanner type={feedback.type} message={feedback.message} />

      <div className="two-column-grid">
        <Panel
          title={editing ? "Edit student" : "Create student"}
          description="Student accounts are created as `student` role users with linked profile records."
        >
          <StudentForm
            initialValues={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
            loading={loading}
          />
        </Panel>

        <Panel 
          title="Student directory" 
          description="Review student records and open them for editing."
        >
          <EntityTable
            emptyText="No students yet."
            columns={[
              { 
                key: "name", 
                label: "Name", 
                render: (row) => (
                  <div style={{ fontWeight: 600 }}>{row.user?.name}</div>
                ) 
              },
              { key: "email", label: "Email", render: (row) => row.user?.email },
              { key: "department", label: "Department" },
              { 
                key: "status", 
                label: "Status",
                render: (row) => (
                  <span className={`badge ${row.status?.toLowerCase()}`}>
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
                      title="Edit student"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      type="button" 
                      className="icon-button danger" 
                      onClick={() => handleDelete(row._id)}
                      title="Delete student"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ),
              },
            ]}
            rows={students.map((student) => ({ ...student, id: student._id }))}
          />
        </Panel>
      </div>
    </div>
  );
};

export default StudentManagementPage;
