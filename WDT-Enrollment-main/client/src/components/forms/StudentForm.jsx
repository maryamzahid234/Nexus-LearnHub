import { useEffect, useState } from "react";

const emptyStudent = {
  name: "",
  email: "",
  password: "",
  phone: "",
  department: "",
  status: "active",
};

const StudentForm = ({ initialValues, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(emptyStudent);

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.user?.name || "",
        email: initialValues.user?.email || "",
        password: "",
        phone: initialValues.phone || "",
        department: initialValues.department || "",
        status: initialValues.status || "active",
      });
    } else {
      setForm(emptyStudent);
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = initialValues
      ? {
          name: form.name,
          email: form.email,
          phone: form.phone,
          department: form.department,
          status: form.status,
        }
      : form;

    onSubmit(payload);
  };

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Student name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      {!initialValues && (
        <input
          name="password"
          type="password"
          placeholder="Temporary password"
          value={form.password}
          onChange={handleChange}
          required
        />
      )}
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="ghost-button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Saving..." : initialValues ? "Update student" : "Create student"}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
