const errorHandler = (error, _req, res, _next) => {
  console.log('erro');
  const erro = JSON.parse(error.message);
  res.status(erro.status || 500).json({ message: erro.message });
};

module.exports = errorHandler;