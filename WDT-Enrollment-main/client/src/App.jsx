import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import StudentManagementPage from "./pages/StudentManagementPage";
import CourseManagementPage from "./pages/CourseManagementPage";
import EnrollmentManagementPage from "./pages/EnrollmentManagementPage";
import CourseCatalogPage from "./pages/CourseCatalogPage";
import MyEnrollmentsPage from "./pages/MyEnrollmentsPage";

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <AppShell />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route
        path="students"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <StudentManagementPage />
          </RoleRoute>
        }
      />
      <Route
        path="courses/manage"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <CourseManagementPage />
          </RoleRoute>
        }
      />
      <Route
        path="enrollments/manage"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <EnrollmentManagementPage />
          </RoleRoute>
        }
      />
      <Route path="courses" element={<CourseCatalogPage />} />
      <Route
        path="my-enrollments"
        element={
          <RoleRoute allowedRoles={["student"]}>
            <MyEnrollmentsPage />
          </RoleRoute>
        }
      />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
