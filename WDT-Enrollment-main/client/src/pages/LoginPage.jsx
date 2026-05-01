import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/forms/AuthForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (payload) => {
    try {
      setLoading(true);
      setError("");
      const response = await login(payload);
      const destination = location.state?.from?.pathname || "/dashboard";
      navigate(response.user.role === "admin" ? "/dashboard" : destination, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <AuthForm mode="login" onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
};

export default LoginPage;
