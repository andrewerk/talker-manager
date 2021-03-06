const express = require('express');

const app = express();

const middlewares = require('./middlewares');

app.use(express.json());

app.use('', require('./routes'));

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(middlewares.errorHandler);

app.listen(PORT, () => {
  console.log('Online');
});
