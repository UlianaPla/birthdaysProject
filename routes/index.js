const express = require('express');

const dinnersRoute = require('./dinners');
const tourneysRoute = require('./tourneys');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    console.log('router index.js works');
    response.send('Hello Ex[pressooooooo from router :)');
    // response.render('pages/index', { pageTitle: 'Welcome' });
  });

  router.use('/dinners', dinnersRoute());
  router.use('/tourneys', tourneysRoute());

  return router;
};
