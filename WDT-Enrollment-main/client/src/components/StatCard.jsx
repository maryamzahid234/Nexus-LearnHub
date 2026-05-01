import { motion } from "framer-motion";

const StatCard = ({ label, value, detail, icon: Icon }) => (
  <motion.div
    className="stat-card"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="stat-header">
      <span>{label}</span>
      {Icon && <Icon size={20} strokeWidth={2.5} className="muted-icon" />}
    </div>
    <strong>{value}</strong>
    <p>{detail}</p>
  </motion.div>
);

export default StatCard;
