const errorHandler = (error, _req, res, _next) => {
  const erro = JSON.parse(error.message);
  res.status(erro.status || 500).json({ message: erro.message });
};

module.exports = errorHandler;