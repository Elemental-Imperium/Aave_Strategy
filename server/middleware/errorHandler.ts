export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.type === 'validation') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.details
    });
  }

  if (err.type === 'blockchain') {
    return res.status(503).json({
      error: 'Blockchain Error',
      details: err.message
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
}; 