const Panel = ({ title, description, children }) => (
  <section className="panel">
    {(title || description) && (
      <div className="panel-header">
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
      </div>
    )}
    {children}
  </section>
);

export default Panel;
