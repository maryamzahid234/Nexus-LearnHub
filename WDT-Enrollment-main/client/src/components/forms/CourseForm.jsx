import { useEffect, useState } from "react";

const emptyCourse = {
  title: "",
  description: "",
  instructor: "",
  duration: "",
  category: "",
  status: "published",
};

const CourseForm = ({ initialValues, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(emptyCourse);

  useEffect(() => {
    setForm(
      initialValues
        ? {
            title: initialValues.title || "",
            description: initialValues.description || "",
            instructor: initialValues.instructor || "",
            duration: initialValues.duration || "",
            category: initialValues.category || "",
            status: initialValues.status || "published",
          }
        : emptyCourse
    );
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <form className="stack-form" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
      <input name="title" placeholder="Course title" value={form.title} onChange={handleChange} required />
      <textarea
        name="description"
        placeholder="Course description"
        value={form.description}
        onChange={handleChange}
        rows="4"
        required
      />
      <input
        name="instructor"
        placeholder="Instructor"
        value={form.instructor}
        onChange={handleChange}
        required
      />
      <input name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="ghost-button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Saving..." : initialValues ? "Update course" : "Create course"}
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
