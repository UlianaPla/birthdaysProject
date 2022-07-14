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

  /**
   * Get person information provided a name
   * @param {*} name
   * @returns
   */
  async function getPerson(name) {
    const text = `SELECT * FROM dinners WHERE name=$1;`;
    const values = [name];
    return db.query(text, values);
  }

  router.get('/:shortname', (request, response) => {
    // const resPromise = db.query(`SELECT * FROM dinners WHERE name=$1;`, [request.params.shortname]);

    getPerson(request.params.shortname).then((data) => response.send(data.rows));

    // return response.send(`Detail page of ${request.params.shortname}`);
  });

  /*  
  async function addPerson(nameVal, birthdateVal, entreeVal, sideVal, dessertVal) {
    const text = `INSERT INTO dinners (
              name, birthdate, entree, side, dessert
              ) VALUES ($1, $2, $3, $4, $5) RETURNING id;`;

    const values = [nameVal, birthdateVal, entreeVal, sideVal, dessertVal];
    return db.query(text, values);
  }

  router.post('', (request, response) => {
    const { params } = request;

    addPerson(params.name, params.birthdate, params.enree, params.side, params.dessert).then(
      (data) => response.send(data.rows)
    );

    // return response.send(`Detail page of ${request.params.shortname}`);
  }); */

  return router;
};
