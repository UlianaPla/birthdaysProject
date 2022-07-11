const express = require('express');
const db = require('../db');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    const resPromise = db.query(`SELECT * FROM dinners;`, []);

    resPromise.then((data) => {
      response.send(data.rows);
    });

    // return response.send('Dinners list');
  });

  router.get('/:shortname', (request, response) => {
    const resPromise = db.query(`SELECT * FROM dinners WHERE name=$1;`, [request.params.shortname]);

    resPromise.then((data) => {
      response.send(data.rows);
    });

    // return response.send(`Detail page of ${request.params.shortname}`);
  });

  return router;
};
