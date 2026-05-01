import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardList, 
  GraduationCap, 
  LogOut,
  Sparkles
} from "lucide-react";

const navItemsByRole = {
  admin: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/students", label: "Students", icon: Users },
    { to: "/courses/manage", label: "Courses", icon: BookOpen },
    { to: "/enrollments/manage", label: "Enrollments", icon: ClipboardList },
  ],
  student: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/courses", label: "Courses", icon: GraduationCap },
    { to: "/my-enrollments", label: "My Enrollments", icon: ClipboardList },
  ],
};

const AppShell = () => {
  const { user, logout } = useAuth();
  const navItems = navItemsByRole[user?.role] || [];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div>
          <motion.div
            className="brand-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>LEARNHUB</span>
            </div>
            <h1>Nexus</h1>
            <p>Unified learning operations & enrollment.</p>
          </motion.div>

          <nav className="nav-list">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <item.icon size={18} strokeWidth={2.5} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-name">{user?.name}</div>
            <div className="user-role">{user?.role}</div>
          </div>
          <button type="button" className="icon-button danger" onClick={logout} title="Sign out">
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
