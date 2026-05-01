import { useEffect, useState } from "react";
import { Users, BookOpen, ClipboardList, Info } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import { studentService } from "../services/studentService";
import { courseService } from "../services/courseService";
import { enrollmentService } from "../services/enrollmentService";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        if (user.role === "admin") {
          const [students, courses, enrollments] = await Promise.all([
            studentService.getStudents(),
            courseService.getCourses(),
            enrollmentService.getEnrollments(),
          ]);
          setStats({
            students: students.length,
            courses: courses.length,
            enrollments: enrollments.length,
          });
        } else {
          const [courses, enrollments] = await Promise.all([
            courseService.getCourses(),
            enrollmentService.getMyEnrollments(),
          ]);
          setStats({
            students: 1,
            courses: courses.length,
            enrollments: enrollments.length,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, [user.role]);

  return (
    <div className="page-stack">
      <PageHeader
        title={user.role === "admin" ? "Learning operations dashboard" : "Your learning dashboard"}
        description={
          user.role === "admin"
            ? "Monitor platform health, course inventory, and enrollment activity from one calm workspace."
            : "Track your course opportunities and active enrollments in one focused view."
        }
      />

      <div className="stats-grid">
        <StatCard 
          label="Students" 
          value={stats.students} 
          detail="Registered student profiles" 
          icon={Users}
        />
        <StatCard 
          label="Courses" 
          value={stats.courses} 
          detail="Available learning experiences" 
          icon={BookOpen}
        />
        <StatCard 
          label="Enrollments" 
          value={stats.enrollments} 
          detail="Current course joins" 
          icon={ClipboardList}
        />
      </div>

      <Panel
        title="Platform direction"
        description="This interface is intentionally minimal: clear surfaces, soft gradients, and motion that helps users follow state changes without feeling decorative."
      >
        <div className="info-box">
          <Info size={18} className="muted-icon" />
          <p className="muted-copy">
            Use the sidebar to manage records, browse course inventory, and keep enrollment activity accurate across the system.
          </p>
        </div>
      </Panel>
    </div>
  );
};

export default DashboardPage;
