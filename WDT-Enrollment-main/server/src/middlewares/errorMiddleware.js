const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || res.statusCode || 500;

  res.status(statusCode >= 400 ? statusCode : 500).json({
    success: false,
    message: error.message || "Something went wrong",
  });
};

module.exports = {
  notFound,
  errorHandler,
};
