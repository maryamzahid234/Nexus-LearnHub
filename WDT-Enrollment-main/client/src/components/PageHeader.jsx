import { motion } from "framer-motion";

const PageHeader = ({ title, description, action }) => (
  <motion.div
    className="page-header"
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
  >
    <div>
      <span className="eyebrow">Workspace</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    {action}
  </motion.div>
);

export default PageHeader;
