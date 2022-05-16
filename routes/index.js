const fs = require('fs').promises;

const express = require('express');

const middlewares = require('../middlewares');

require('express-async-errors');

const routes = express.Router();

async function readTalker() {
  const result = await fs.readFile('talker.json');
  const resultRead = JSON.parse(result);
  if (resultRead) {
    return resultRead;
  } 
  return []; 
}

routes.get('/talker', async (_req, res) => {
  const talkers = await readTalker();
  res.status(200).json(talkers);
});

routes.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalker();
  const person = talkers.filter((p) => p.id === Number(id));
  if (person.length > 0) return res.status(200).json(person[0]);
  throw new Error(JSON.stringify({ status: 404, message: 'Pessoa palestrante não encontrada' }));
});

routes.use(middlewares.errorHandler);

module.exports = routes;