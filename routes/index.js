const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    console.log('router index.js works');
    response.render('pages/index', { pageTitle: 'Welcome' });
  });

  return router;
};
