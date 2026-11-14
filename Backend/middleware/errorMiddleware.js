exports.notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError')
    return res.status(400).json({ message: 'Invalid ID format' });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  // Duplicate key
  if (err.code === 11000)
    return res
      .status(400)
      .json({ message: `${Object.keys(err.keyValue)[0]} already exists` });

  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error',
  });
};