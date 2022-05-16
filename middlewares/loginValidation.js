const loginValidation = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email) {
    throw new Error(JSON.stringify({ status: 400, message: 'O campo "email" é obrigatório' }));
  }
  const emailCheck = /\S+@\S+\.\S+/;
  if (!emailCheck.test(email)) {
    throw new Error(JSON.stringify({
      status: 400, message: 'O "email" deve ter o formato "email@email.com"' }));
  }
  if (!password) {
    throw new Error(JSON.stringify({ status: 400, message: 'O campo "password" é obrigatório' }));
  }
  if (password.length < 6) {
    throw new Error(JSON.stringify({
       status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' }));
  }
  next();
};

module.exports = loginValidation;