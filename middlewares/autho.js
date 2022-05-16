const autho = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error(JSON.stringify({ status: 401, message: 'Token não encontrado' }));
  }
  if (token.length !== 16) {
    throw new Error(JSON.stringify({
       status: 401, message: 'Token inválido' }));
  }
  next();
};

module.exports = autho;