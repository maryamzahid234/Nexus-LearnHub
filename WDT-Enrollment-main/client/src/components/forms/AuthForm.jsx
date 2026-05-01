import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import FeedbackBanner from "../FeedbackBanner";

const initialState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  department: "",
};

const AuthForm = ({ mode, onSubmit, loading, error }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload =
      mode === "login"
        ? { email: form.email, password: form.password }
        : { ...form, role: "student" };

    await onSubmit(payload);
  };

  return (
    <motion.form
      className="auth-card"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="auth-header">
        <div className="eyebrow">
          <Sparkles size={14} />
          <span>LEARNHUB</span>
        </div>
        <h1>{mode === "login" ? "Welcome back" : "Create account"}</h1>
        <p>
          {mode === "login"
            ? "Access your learning workspace to manage courses and enrollments."
            : "Register as a student to explore our catalog and start learning."}
        </p>
      </div>

      {error && <FeedbackBanner type="error" message={error} />}

      <div className="stack-form">
        {mode === "register" && (
          <>
            <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
            <input name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} />
            <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
          </>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="primary-button auth-button" disabled={loading}>
          <span>{loading ? "Processing..." : mode === "login" ? "Sign in" : "Create account"}</span>
          {!loading && <ArrowRight size={18} />}
        </button>
      </div>

      <div className="auth-switch">
        {mode === "login" ? (
          <p>
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        ) : (
          <p>
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        )}
      </div>
    </motion.form>
  );
};

export default AuthForm;
