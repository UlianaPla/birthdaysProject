/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'sandbox',
  password: 'sandbox',
  database: 'birthdays',
});

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });

    return res;
  },
};
