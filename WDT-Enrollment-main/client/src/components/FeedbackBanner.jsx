const FeedbackBanner = ({ type = "info", message }) =>
  message ? <div className={`feedback-banner ${type}`}>{message}</div> : null;

export default FeedbackBanner;
