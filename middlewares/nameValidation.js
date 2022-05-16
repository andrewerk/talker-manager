const nameValidation = (req, _res, next) => {
  const { name } = req.body;
  if (!name) {
    throw new Error(JSON.stringify({ status: 400, message: 'O campo "name" é obrigatório' }));
  }
  if (name.length < 4) {
    throw new Error(JSON.stringify({
       status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' }));
    }
  next();
};

module.exports = nameValidation;