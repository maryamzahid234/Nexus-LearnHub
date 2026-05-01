import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/forms/AuthForm";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (payload) => {
    try {
      setLoading(true);
      setError("");
      await register(payload);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <AuthForm mode="register" onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
};

export default RegisterPage;
