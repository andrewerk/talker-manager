const errorHandler = require('./errorHandler');
const loginValidation = require('./loginValidation');
const autho = require('./autho');
const nameValidation = require('./nameValidation');
const ageValidation = require('./ageValidation');
const { talkValidation, rateAndWatchedValidation } = require('./talkValidation');

module.exports = { 
  errorHandler,
  loginValidation,
  autho,
  nameValidation,
  ageValidation,
  talkValidation,
  rateAndWatchedValidation,  
 };