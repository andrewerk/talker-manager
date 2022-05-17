const talkValidation = (req, _res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    throw new Error(JSON.stringify({
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  }));
  }
  next();
};

const rateAndWatchedValidation = (req, _res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  if (rate < 1 || rate > 5 || rate === 0) {
    throw new Error(JSON.stringify({
      status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' }));
    }
  const validDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  
  if (!validDate.test(watchedAt)) {
    throw new Error(JSON.stringify({
      status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }));
      }
  next();
  };

module.exports = { talkValidation, rateAndWatchedValidation };