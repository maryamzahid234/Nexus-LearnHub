import { useState } from "react";

const EnrollmentForm = ({ students, courses, onSubmit, loading }) => {
  const [form, setForm] = useState({ studentId: "", courseId: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <form
      className="stack-form inline-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <select name="studentId" value={form.studentId} onChange={handleChange} required>
        <option value="">Select student</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.user?.name}
          </option>
        ))}
      </select>
      <select name="courseId" value={form.courseId} onChange={handleChange} required>
        <option value="">Select course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.title}
          </option>
        ))}
      </select>
      <button type="submit" className="primary-button" disabled={loading}>
        {loading ? "Saving..." : "Add enrollment"}
      </button>
    </form>
  );
};

export default EnrollmentForm;
