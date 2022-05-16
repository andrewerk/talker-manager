const fs = require('fs').promises;

const express = require('express');

const routes = express.Router();

async function readTalker() {
  const result = await fs.readFile('talker.json');
  const resultRead = JSON.parse(result);
  if (resultRead) {
    return resultRead;
  } 
  return []; 
}

routes.get('/', async (_req, res) => {
  const talkers = await readTalker();
  res.status(200).json(talkers);
});

module.exports = routes;