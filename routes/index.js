const fs = require('fs').promises;

const crypto = require('crypto');

const express = require('express');

const middlewares = require('../middlewares');

// Library from express, used to deal with async exceptions launched (throw new Error)
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

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
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
  // JSON.stringy in the errors due to its only compatibility with strings
  throw new Error(JSON.stringify({ status: 404, message: 'Pessoa palestrante não encontrada' }));
});

routes.post('/login', middlewares.loginValidation, (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

routes.use(middlewares.autho);

routes.post('/talker',
  middlewares.nameValidation,
  middlewares.ageValidation,
  middlewares.talkValidation,
  middlewares.rateAndWatchedValidation,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const { rate, watchedAt } = talk;
    const talkers = await readTalker();
    const id = talkers.length + 1;
    const newTalkers = [...talkers, { name, age, id, talk: { watchedAt, rate } }];
    console.log(newTalkers);
    await fs.writeFile('talker.json', JSON.stringify(newTalkers, null, 2));
    res.status(201).json({ name, age, id, talk: { watchedAt, rate } });
});

routes.use(middlewares.errorHandler);

module.exports = routes;