
const { Client } = require('pg');
const TABLE_DINNERS = 'dinners', 
      TABLE_TOURNEYS = 'tourneys';


const client = new Client({
    user: 'sandbox',
    password: 'sandbox',
    database: 'birthdays',
  });

showAll(TABLE_DINNERS);
//addDinner('Antosha', '1992-07-22', 'milk', 'cheese', 'apple');
//updateMaxPoints('Gladys', 450);
//deleteDinnerByFriend('Antosha');

function showAll(table)
{
    console.log(`--------TABLE--${table}------`);    
    doQuery(`SELECT * FROM ${table};`);
}

function addDinner(nameVal, birthdateVal, entreeVal, sideVal, dessertVal)
{
    console.log(`--------ADD DINNER------`);   

    const query = {
        text: `INSERT INTO dinners (
            name, birthdate, entree, side, dessert
            ) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        values: [nameVal, birthdateVal, entreeVal, sideVal, dessertVal],
    }

    doQuery(query);
}

function updateMaxPoints(name, newValue)
{
    console.log(`--------UPDATE ------`);  
    
    const query = {
        text: `UPDATE tourneys 
            SET best = $2
            WHERE name = $1;`,
        values: [name, newValue,],
    } 
    doQuery(query);
}

function deleteDinnerByFriend(friendName)
{    
    console.log(`--------DELETE ------`);  
    
    const query = {
        text: `DELETE FROM dinners 
            WHERE name = $1;`,
        values: [friendName],
    } 

    doQuery(query);
}

function doQuery(query)
{
    client.connect();
    client.query(query, (err, res) => {
        console.log('result:');
        console.log(err ? err.stack : res.rows); 

        client.end();
    });
}


