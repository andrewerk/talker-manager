const ageValidation = (req, _res, next) => {
  const { age } = req.body;
  if (!age) {
    throw new Error(JSON.stringify({ status: 400, message: 'O campo "age" é obrigatório' }));
  }
  if (age < 18) {
    throw new Error(JSON.stringify({
       status: 400, message: 'A pessoa palestrante deve ser maior de idade' }));
    }
  next();
};

module.exports = ageValidation;