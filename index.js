/* eslint-disable consistent-return */

const express = require('express');
const routes = require('./routes');
const db = require('./db');

const app = express();
const port = 3000;

console.log('starting');

app.get('/', (request, responce) => {
  responce.send('Hello Ex[press :)');
});

app.get('/dinners', (req, res, next) => {
  console.log('get');
  db.query(`SELECT * FROM dinners;`, [], (err, result) => {
    console.log(err ? err.stack : result.rows);
    if (err) {
      return next(err);
    }
    res.send(result.rows);
  });
});

//app.use('/', routes());

const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
